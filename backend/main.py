import os
import json
import google.generativeai as genai
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel

# Initialize FastAPI
app = FastAPI()

# Allow Next.js frontend to call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount static files and templates for the legacy app
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")

# Configure Google API Key (Set this in your .env file)
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY", "AIzaSyBDC1qR2rvRAokJE4Qe7-edzDfKzdCjBzU"))

# Define the data model for the incoming request from your React frontend
class LogRequest(BaseModel):
    raw_logs: str

# Define the System Instruction (from the prompt above)
SYSTEM_PROMPT = """
You are Glitchless, an elite DevOps and Full-Stack debugging AI.

Task: You will receive raw, messy deployment or build logs. Your job is to act as a senior engineer: pinpoint the exact root cause of the failure, ignore the noise/warnings that didn't cause the crash, explain the issue to a junior developer, and provide the exact steps to fix it.

Output Constraint: You must respond ONLY with a valid JSON object matching the exact schema below. Do not include markdown code blocks (like ```json), conversational text, or greetings. Return ONLY the raw JSON object.

Required JSON Schema:
{
  "status": "success" | "failure",
  "insight_stream": {
    "severity": "CRITICAL" | "WARNING",
    "title": "Short title of the error (e.g., ERESOLVE Dependency Conflict)",
    "plain_english": "A 1-2 sentence human-readable explanation of why this broke."
  },
  "auto_fix": {
    "steps": [
      {
        "action_title": "Short title (e.g., Uninstall node-sass)",
        "command": "npm uninstall node-sass",
        "is_terminal_command": true
      },
      {
        "action_title": "Update package.json",
        "code_diff": {
          "file": "package.json",
          "remove": "\"node-sass\": \"^6.0.0\"",
          "add": "\"sass\": \"^1.69.0\""
        },
        "is_terminal_command": false
      }
    ]
  }
}
"""

# Initialize the Gemini Model (Using Gemini 1.5 Flash for high speed/low latency, perfect for log parsing)
# We set response_mime_type to force JSON output.
model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    system_instruction=SYSTEM_PROMPT,
    generation_config={"response_mime_type": "application/json"}
)

@app.post("/api/analyze-logs")
async def analyze_logs(request: LogRequest):
    try:
        # Prevent empty submissions
        if not request.raw_logs.strip():
            raise HTTPException(status_code=400, detail="Logs cannot be empty.")

        # Send the logs to Gemini
        response = model.generate_content(request.raw_logs)
        
        # Parse the JSON response
        parsed_result = json.loads(response.text)
        
        # Return the structured data to your frontend
        return parsed_result

    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="AI returned malformed JSON.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# ==========================================
# Legacy PHP-converted Python API Routes
# ==========================================

@app.get("/legacy/", response_class=HTMLResponse)
async def legacy_index(request: Request):
    user_id = request.cookies.get("session_user_id")
    if user_id:
        return RedirectResponse(url="/legacy/dashboard", status_code=303)
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/legacy/login")
async def legacy_login(response: Response):
    resp = RedirectResponse(url="/legacy/dashboard", status_code=303)
    # Simulate session login
    resp.set_cookie(key="session_user_id", value="1")
    resp.set_cookie(key="session_username", value="dev_user")
    return resp

@app.get("/legacy/dashboard", response_class=HTMLResponse)
async def legacy_dashboard(request: Request):
    user_id = request.cookies.get("session_user_id")
    if not user_id:
        return RedirectResponse(url="/legacy/", status_code=303)
    username = request.cookies.get("session_username", "dev_user")
    return templates.TemplateResponse("dashboard.html", {"request": request, "username": username})

@app.get("/legacy/analysis", response_class=HTMLResponse)
async def legacy_analysis(request: Request):
    user_id = request.cookies.get("session_user_id")
    if not user_id:
        return RedirectResponse(url="/legacy/", status_code=303)
    return templates.TemplateResponse("analysis.html", {"request": request})

@app.get("/legacy/logout")
async def legacy_logout(response: Response):
    resp = RedirectResponse(url="/legacy/", status_code=303)
    resp.delete_cookie("session_user_id")
    resp.delete_cookie("session_username")
    return resp
