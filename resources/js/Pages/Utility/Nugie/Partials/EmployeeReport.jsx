import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

export default function EmployeeReport({}){
    return(
        <TabGroup>
            <TabList>
                <Tab>Tabel</Tab>
                <Tab>Grafik</Tab>
            </TabList>
            <TabPanels>
                <TabPanel></TabPanel>
            </TabPanels>
        </TabGroup>
    )
}