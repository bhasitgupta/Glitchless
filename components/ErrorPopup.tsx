"use client";

interface ErrorPopupProps {
  error: {
    message: string;
    line?: number;
    column?: number;
    type: "error" | "warning" | "info";
  };
  onClose: () => void;
  onFix?: () => void;
}

export default function ErrorPopup({ error, onClose, onFix }: ErrorPopupProps) {
  const colors = {
    error: {
      bg: "bg-[rgba(239,68,68,0.1)]",
      border: "border-red-500/50",
      icon: "text-red-400",
      title: "text-red-400",
    },
    warning: {
      bg: "bg-[rgba(245,158,11,0.1)]",
      border: "border-yellow-500/50",
      icon: "text-yellow-400",
      title: "text-yellow-400",
    },
    info: {
      bg: "bg-[rgba(59,130,246,0.1)]",
      border: "border-blue-500/50",
      icon: "text-blue-400",
      title: "text-blue-400",
    },
  };

  const color = colors[error.type];

  return (
    <div className="fixed top-4 right-4 z-[2000] animate-slideInRight">
      <div
        className={`${color.bg} ${color.border} backdrop-blur-xl border rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] p-4 max-w-md`}
      >
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className={`${color.icon} mt-0.5`}>
            {error.type === "error" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            {error.type === "warning" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            )}
            {error.type === "info" && (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between gap-2">
              <h4 className={`${color.title} font-semibold text-sm capitalize`}>
                {error.type}
              </h4>
              {(error.line || error.column) && (
                <span className="text-gray-400 text-xs">
                  Line {error.line}, Col {error.column}
                </span>
              )}
            </div>
            <p className="text-gray-300 text-sm mt-1">{error.message}</p>

            {/* Actions */}
            <div className="flex items-center gap-2 mt-3">
              {onFix && (
                <button
                  onClick={onFix}
                  className="px-3 py-1.5 bg-gradient-to-r from-[#00F2FF] to-[#0099CC] text-white text-xs font-medium rounded-lg hover:shadow-[0_4px_15px_rgba(0,242,255,0.3)] transition-all hover:scale-105"
                >
                  Fix It
                </button>
              )}
              <button
                onClick={onClose}
                className="px-3 py-1.5 bg-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/20 transition-all"
              >
                Dismiss
              </button>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors p-1 hover:bg-white/10 rounded-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
