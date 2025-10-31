
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const xmlparser = require("express-xml-bodyparser");
const js2xmlparser = require("js2xmlparser");
const { js2xml } = require("xml-js");

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(xmlparser());

dotenv.config();

const PORT = process.env.PORT || 5051;

app.get("/", (req, res) => {
    res.send("Working");
});

///////////////////////////////////////////////////////////////////////////
//      V1

app.get("/v1/getPost", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getPost" });
});

app.get("/v1/getData", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getData" });
});

app.get("/v1/getInfo", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getInfo" });
});

app.get("/v1/getDetails", (req, res) => {
    res.json({ version: "v1", data: "This is the Original Version of getDetails" });
});


///////////////////////////////////////////////////////////////////////////
//      V2

app.get("/v2/getPost", (req, res) => {
    res.json({ version: "v2", data: "This is the Original Version of getPost" });
});

app.get("/v2/getData", (req, res) => {
    res.json({ version: "v2", data: "This is the Original Version of getData" });
});

app.get("/v2/getInfo", (req, res) => {
    res.json({ version: "v2", data: "This is the Original Version of getInfo" });
});

app.get("/v2/getDetails", (req, res) => {
    res.json({ version: "v2", data: "This is the Updated V2 Version of getDetails" });
});

///////////////////////////////////////////////////////////////////////////
//      V3

app.get("/v3/getPost", (req, res) => {
    res.json({ version: "v3", data: "This is the Original Version of getPost" });
});

app.get("/v3/getData", (req, res) => {
    res.json({ version: "v3", data: "This is the Original Version of getData" });
});

app.get("/v3/getInfo", (req, res) => {
    res.json({ version: "v3", data: "This is the Updated V3 Version of getInfo" });
});

app.get("/v3/getDetails", (req, res) => {
    res.json({ version: "v3", data: "This is the Updated V2 Version of getDetails" });
});


///////////////////////////////////////////////////////////////////////////
//      V4

app.get("/v4/getPost", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V4 Version of getPost" });
});

app.get("/v4/getData", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V4 Version of getData" });
});

app.get("/v4/getInfo", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V3 Version of getInfo" });
});

app.get("/v4/getDetails", (req, res) => {
    res.json({ version: "v4", data: "This is the Updated V2 Version of getDetails" });
});


///////////////////////////////////////////////////////////////////////////
//      POST V1


app.post("/v1/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v1",
        data: `This is the Original Version and data : ${data}`
    });
});

app.post("/v1/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v1",
        data: `This is the Original Version and data : ${data}`
    });
});

///////////////////////////////////////////////////////////////////////////
//      POST V2


app.post("/v2/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v2",
        data: `This is the Original Version and data : ${data}`
    });
});

app.post("/v2/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v2",
        data: `This is the Updated V2 Version and data : ${data}`
    });
});

///////////////////////////////////////////////////////////////////////////
//      POST V3


app.post("/v3/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v3",
        data: `This is the Original Version and data : ${data}`
    });
});

app.post("/v3/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v3",
        data: `This is the Updated V3 Version and data : ${data}`
    });
});


///////////////////////////////////////////////////////////////////////////
//      POST V4


app.post("/v4/postInfo", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v4",
        data: `This is the Updated V4 Version and data : ${data}`
    });
});

app.post("/v4/postData", (req, res) => {
    const { data } = req.body;
    res.json({
        version: "v4",
        data: `This is the Updated V4 Version and data : ${data}`
    });
});


//xml
//v1
app.post("/v1/postInfo_xml", (req, res) => {
    try {
        const data = req.body?.root?.data?.[0];
        const response = `
            <root>
                <version>v1</version>
                <data>This is the Original Version and data : ${data}</data>
            </root>
        `;
        res.set("Content-Type", "application/xml");
        res.send(response);
    } catch {
        res.send("error");
    }
});
//v2
app.post("/v2/postInfo_xml", (req, res) => {
    try {
        const data = req.body?.root?.data?.[0];
        const response = `
            <root>
                <version>v2</version>
                <data>This is the Updated V2 Version and data : ${data}</data>
            </root>
        `;
        res.set("Content-Type", "application/xml");
        res.send(response);
    } catch {
        res.send("error");
    }
});

//v3
app.post("/v3/postInfo_xml", (req, res) => {
    try {
        const data = req.body?.root?.data?.[0];
        const response = `
            <root>
                <version>v3</version>
                <data>This is the Updated V3 Version and data : ${data}</data>
            </root>
        `;
        res.set("Content-Type", "application/xml");
        res.send(response);
    } catch {
        res.send("error");
    }
});

//v4
app.post("/v4/postInfo_xml", (req, res) => {
    try {
        const data = req.body?.root?.data?.[0];
        const response = `
            <root>
                <version>v4</version>
                <data>This is the Updated V4 Version and data : ${data}</data>
            </root>
        `;
        res.set("Content-Type", "application/xml");
        res.send(response);
    } catch {
        res.send("error");
    }
});


//POC

app.post("/services/:version/CampaignService.svc/api/AddOrUpdate", (req, res) => {
    console.log(req.body);
    let id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;;
    try {
        const response = `
            <Campaign xmlns="urn:AdStore/Campaign/V20252" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
                <Inserted xmlns="urn:AdStore/V20252">2025-04-12T09:01:56.253</Inserted>
                <InsertedBy xmlns="urn:AdStore/V20252">-10</InsertedBy>
                <Updated xmlns="urn:AdStore/V20252">2025-04-15T09:58:56.147</Updated>
                <UpdatedBy xmlns="urn:AdStore/V20252">-12</UpdatedBy>
                <Version xmlns="urn:AdStore/V20252">1</Version>
                <AccountType>National</AccountType>
                <AdvertiserId>10201</AdvertiserId>
                <AgencyId>10202</AgencyId>
                <CampaignId>${id}</CampaignId>
                <CampaignType>Regular</CampaignType>
                <Comment i:nil="true"/>
                <DeliveryAndBillingSummary i:nil="true"/>
                <Documents i:nil="true"/>
                <ExternalId>32434</ExternalId>
                <IsMarketingVentInitiative>false</IsMarketingVentInitiative>
                <IsSponsorship>false</IsSponsorship>
                <RevenueType>Cash</RevenueType>
                <SubHeaders i:nil="true"/>
                <Title>Test AVI Avilas, Proposals and Campaigns</Title>
                <ValidFrom>2025-03-31T00:00:00</ValidFrom>
                <ValidTo>2025-07-20T00:00:00</ValidTo>
            </Campaign>
        `;
        res.set("Content-Type", "application/xml");
        res.status(200).send(response);
    } catch {
        res.status(400).send("error");
    }
});


app.post("/services/:version/SubHeaderService.svc/api/AddOrUpdate", (req, res) => {
    console.log(req.body);
    let id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;;
    try {
        const response = `
            <SubHeader xmlns="urn:AdStore/Campaign/V20252" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
                <Inserted xmlns="urn:AdStore/V20252">2025-04-12T09:13:14.92</Inserted>
                <InsertedBy xmlns="urn:AdStore/V20252">-10</InsertedBy>
                <Updated xmlns="urn:AdStore/V20252">2025-04-14T15:26:58.03</Updated>
                <UpdatedBy xmlns="urn:AdStore/V20252">-10</UpdatedBy>
                <Version xmlns="urn:AdStore/V20252">16</Version>
                <AgencyExternalId/>
                <CampaignId>102976</CampaignId>
                <DateBooked i:nil="true"/>
                <DeliveryAndBillingSummary i:nil="true"/>
                <ExternalComment i:nil="true"/>
                <ExternalId>247404</ExternalId>
                <InternalComment i:nil="true"/>
                <LastSyncedOn>2025-04-14T15:26:58.013</LastSyncedOn>
                <OrderStatus>Order</OrderStatus>
                <Positions/>
                <PriceFreezeFrom>2025-04-12T00:00:00</PriceFreezeFrom>
                <PriceFreezeTo>2025-04-13T09:48:04.037</PriceFreezeTo>
                <ProcessStatus>InWork</ProcessStatus>
                <SalesSystemId>1</SalesSystemId>
                <SubHeaderId>${id}</SubHeaderId>
                <SubHeaderTypeId>100002</SubHeaderTypeId>
                <SyncError i:nil="true"/>
                <SyncStatus>Synced</SyncStatus>
                <TargetingLinks xmlns:a="urn:AdStore/Targeting/V20252">
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>SellingType</a:TargetingType>
                <a:TargetingId>500</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>SalesOffice</a:TargetingType>
                <a:TargetingId>100553</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>PrimarySalesRepresentative</a:TargetingType>
                <a:TargetingId>100579</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>ProductHierarchy</a:TargetingType>
                <a:TargetingId>100918</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>TargetGroup</a:TargetingType>
                <a:TargetingId>109100</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>SpotLengthContext</a:TargetingType>
                <a:TargetingId>101155</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children>
                <a:TargetingLinkBase i:type="a:TargetingLink">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>Market</a:TargetingType>
                <a:TargetingId>101163</a:TargetingId>
                </a:TargetingLinkBase>
                </a:Children>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>Station</a:TargetingType>
                <a:TargetingId>109111</a:TargetingId>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLinkDayTime">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>DayTime</a:TargetingType>
                <a:DaysOfWeek>All</a:DaysOfWeek>
                <a:EndTime>1900-01-01T23:59:59</a:EndTime>
                <a:StartTime>1900-01-01T00:00:00</a:StartTime>
                <a:ValidFrom>2025-05-05T00:00:00</a:ValidFrom>
                <a:ValidTo>2025-08-17T00:00:00</a:ValidTo>
                </a:TargetingLinkBase>
                <a:TargetingLinkBase i:type="a:TargetingLinkDynamic">
                <a:Children/>
                <a:IsExclude>false</a:IsExclude>
                <a:TargetingType>PrioritizeSameSo</a:TargetingType>
                <a:DataType>Boolean</a:DataType>
                <a:Value>false</a:Value>
                </a:TargetingLinkBase>
                </TargetingLinks>
                <Title>Test AVI API Avails Campaign in future CBC News Network</Title>
                <ValidFrom>2025-05-05T00:00:00</ValidFrom>
                <ValidTo>2025-08-17T00:00:00</ValidTo>
            </SubHeader>
        `;
        res.set("Content-Type", "application/xml");
        res.status(200).send(response);
    } catch {
        res.status(400).send("error");
    }
});


app.post("/services/:version/PositionService.svc/api/AddOrUpdate", (req, res) => {
    console.log(req.body);
    let id = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;;
    try {
        const response = `
            <Position xmlns="urn:AdStore/Campaign/V20252" xmlns:i="http://www.w3.org/2001/XMLSchema-instance">
                <Inserted xmlns="urn:AdStore/V20252">2025-04-13T09:46:05.747</Inserted>
                <InsertedBy xmlns="urn:AdStore/V20252">-10</InsertedBy>
                <Updated xmlns="urn:AdStore/V20252">2025-04-14T15:26:59.203</Updated>
                <UpdatedBy xmlns="urn:AdStore/V20252">-10</UpdatedBy>
                <Version xmlns="urn:AdStore/V20252">7</Version>
                <BillingResults i:nil="true"/>
                <ChildPositions/>
                <Deliveries i:nil="true"/>
                <DeliveryAndBillingSummary i:nil="true"/>
                <ExternalComment i:nil="true"/>
                <ExternalDeliveries i:nil="true"/>
                <ExternalId>OSOID:247602,CHID:36,SLCDID:82,MG:False,QD:12-04-2025</ExternalId>
                <InternalComment i:nil="true"/>
                <IsBudgetBased>false</IsBudgetBased>
                <LastSyncedOn>2025-04-14T15:26:59.203</LastSyncedOn>
                <OrderStatus>Order</OrderStatus>
                <ParentPositionId i:nil="true"/>
                <PositionId>${id}</PositionId>
                <PositionType>Regular</PositionType>
                <Product i:nil="true" xmlns:a="urn:AdStore/Product/V20252"/>
                <ProductId>109202</ProductId>
                <QuoteDate>2025-04-12T00:00:00</QuoteDate>
                <RequestedBudget i:nil="true"/>
                <RequestedVolume>0.0000</RequestedVolume>
                <SubHeaderId>104154</SubHeaderId>
                <SyncError i:nil="true"/>
                <SyncStatus>Synced</SyncStatus>
                <TargetingLinks xmlns:a="urn:AdStore/Targeting/V20252">
                    <a:TargetingLinkBase i:type="a:TargetingLink">
                        <a:Children/>
                        <a:IsExclude>false</a:IsExclude>
                        <a:TargetingType>SpotLengthContext</a:TargetingType>
                        <a:TargetingId>101155</a:TargetingId>
                    </a:TargetingLinkBase>
                    <a:TargetingLinkBase i:type="a:TargetingLink">
                        <a:Children/>
                        <a:IsExclude>false</a:IsExclude>
                        <a:TargetingType>Station</a:TargetingType>
                        <a:TargetingId>109111</a:TargetingId>
                    </a:TargetingLinkBase>
                </TargetingLinks>
                <ValidFrom>2025-06-16T00:00:00</ValidFrom>
                <ValidTo>2025-06-22T00:00:00</ValidTo>
            </Position>
        `;
        res.set("Content-Type", "application/xml");
        res.status(200).send(response);
    } catch {
        res.status(400).send("error");
    }
});

app.post("/services/:version/SubHeaderService.svc/api/Propose", (req, res) => {
    let a = req.query.subHeaderId;
    console.log(a);
    try {   
        res.status(200).send();
    } catch {
        res.status(400).send("error");
    }
});

app.post("/services/:version/SubHeaderService.svc/api/Confirm", (req, res) => {
    let a = req.query.subHeaderId;
    console.log(a);
    try {   
        res.status(200).send();
    } catch {
        res.status(400).send("error");
    }
});


app.listen(PORT, () => {
    console.log("Server started ");
});
