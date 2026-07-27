import LoanTabs from "./LoanTabs";

function LoanHeader({ activeTab, setActiveTab }) {
  return (
    <LoanTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

export default LoanHeader;