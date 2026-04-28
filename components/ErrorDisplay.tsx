"use client";

import { useError } from "@/context/ErrorContext";
import ErrorPopup from "@/components/ErrorPopup";
import ErrorFixPopup from "@/components/ErrorFixPopup";

export default function ErrorDisplay() {
  const {
    errors,
    removeError,
    showFixPopup,
    selectedError,
    fixSuggestions,
    selectedFix,
    openFixPopup,
    closeFixPopup,
    selectFix,
  } = useError();

  const handleApplyFix = () => {
    console.log("Applied fix:", fixSuggestions[selectedFix]);
    closeFixPopup();
  };

  return (
    <>
      {errors.map((error) => (
        <ErrorPopup
          key={error.id}
          error={error}
          onClose={() => removeError(error.id)}
          onFix={() => openFixPopup(error)}
        />
      ))}

      {showFixPopup && selectedError && (
        <ErrorFixPopup
          fixes={fixSuggestions}
          selectedFix={selectedFix}
          onSelectFix={selectFix}
          onApplyFix={handleApplyFix}
          onCancel={closeFixPopup}
        />
      )}
    </>
  );
}
