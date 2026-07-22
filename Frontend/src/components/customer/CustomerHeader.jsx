import CustomerTabs from "./CustomerTabs";

function CustomerHeader({ activeTab, setActiveTab }) {
  return (
    <CustomerTabs
      activeTab={activeTab}
      setActiveTab={setActiveTab}
    />
  );
}

export default CustomerHeader;