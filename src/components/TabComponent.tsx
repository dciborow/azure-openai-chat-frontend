import React, { useState } from 'react';
import { Tab, TabList } from '@fluentui/react-components';

const TabComponent = ({ tabs, selectedTabId }) => {
  const [selectedTab, setSelectedTab] = useState(selectedTabId);

  const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
  };

  return (
    <div className="tab-component">
      <TabList selectedKey={selectedTab} onTabSelect={handleTabClick}>
        {tabs.map((tab) => (
          <Tab key={tab.id} id={tab.id}>
            {tab.label}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab) => (
          <TabPanel key={tab.id} id={`tabpanel-${tab.id}`} hidden={selectedTab !== tab.id}>
            <div className="tab-component__content">
              <slot name={tab.id}></slot>
            </div>
          </TabPanel>
        ))}
      </TabPanels>
    </div>
  );
};

export default TabComponent;
