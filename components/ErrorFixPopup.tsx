"use client";

interface FixSuggestion {
  title: string;
  description: string;
  code: string;
}

interface ErrorFixPopupProps {
  fixes: FixSuggestion[];
  selectedFix: number;
  onSelectFix: (index: number) => void;
  onApplyFix: () => void;
  onCancel: () => void;
}

export default function ErrorFixPopup({
  fixes,
  selectedFix,
  onSelectFix,
  onApplyFix,
  onCancel,
}: ErrorFixPopupProps) {
  const fix = fixes[selectedFix];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[2000] flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-[rgba(22,27,34,0.98)] backdrop-blur-xl border border-[rgba(0,242,255,0.3)] rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] w-full max-w-2xl animate-slideInUp">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(0,242,255,0.2)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00F2FF] to-[#0099CC] flex items-center justify-center shadow-[0_0_20px_rgba(0,242,255,0.4)]">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">Apply Fix</h3>
                <p className="text-gray-400 text-sm">Select a fix to apply</p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Fix Suggestions */}
        <div className="p-6">
          <div className="space-y-3 mb-6">
            {fixes.map((fixOption, index) => (
              <button
                key={index}
                onClick={() => onSelectFix(index)}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                  selectedFix === index
                    ? "border-[#00F2FF] bg-[rgba(0,242,255,0.1)]"
                    : "border-[rgba(48,54,61,0.5)] bg-[rgba(48,54,61,0.3)] hover:border-[rgba(0,242,255,0.3)]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                      selectedFix === index
                        ? "border-[#00F2FF] bg-[#00F2FF]"
                        : "border-gray-500"
                    }`}
                  >
                    {selectedFix === index && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium text-sm">{fixOption.title}</h4>
                    <p className="text-gray-400 text-xs mt-1">{fixOption.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Code Preview */}
          {fix && (
            <div className="mb-6">
              <h4 className="text-gray-300 text-sm font-medium mb-2">Preview:</h4>
              <div className="bg-[#0d1117] border border-[rgba(48,54,61,0.5)] rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm font-mono">
                  <code className="text-[#00F2FF]">{fix.code}</code>
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-[rgba(0,242,255,0.2)] flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-6 py-2.5 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={onApplyFix}
            className="px-6 py-2.5 bg-gradient-to-r from-[#00F2FF] to-[#0099CC] text-white font-medium rounded-lg hover:shadow-[0_4px_15px_rgba(0,242,255,0.3)] transition-all hover:scale-105"
          >
            Apply Fix
          </button>
        </div>
      </div>
    </div>
  );
}
