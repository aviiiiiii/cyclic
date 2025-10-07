const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const e = require("express");
const { v4: uuidv4 } = require("uuid");




const app = express();
// app.use(cors());
app.use(cors({ origin: '*'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

dotenv.config();

const mongoURI = process.env.CONNECTION_URL;
const PORT = process.env.PORT || 5000;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get("/", (req, res) => {
  res.send("Working");
});

const vehicleListSchema = new mongoose.Schema({
  type: String,
  number: String,
  date: String,
  toll: String,
  tariff: String,
  dateFormated: Number,
});

const VehicleList = mongoose.model("VehicleList", vehicleListSchema);

const tollListSchema = new mongoose.Schema({
  name: String,
  carSingle: Number,
  carReturn: Number,
  lcvSingle: Number,
  lcvReturn: Number,
  truckSingle: Number,
  truckReturn: Number,
  heavySingle: Number,
  heavyReturn: Number,
});

const TollList = mongoose.model("TollList", tollListSchema);

// const sample={
//     "type": "vehicleType",
//     "number": "vehicleNumber",
//     "date": "dateTime",
//     "toll": "tollName",
//     "tariff": "tariff",
//     "dateFormated":"dateFormated"}

//         VehicleList.insertMany(sample,(err)=>{
//             if(err) console.log(err);
//             else    console.log("Inserted");
//         })Juzt checking

app.get("/getVehicleList", (req, res) => {
  VehicleList.find(
    {},
    null,
    { sort: { dateFormated: -1 } },
    (err, vehicles) => {
      res.send(vehicles);
    }
  );
});

app.get("/getVehicleListWithfilter/:value", (req, res) => {
  let filterValue = req.params.value;
  VehicleList.find(
    { number: { $regex: filterValue, $options: "i" } },
    null,
    { sort: { dateFormated: -1 } },
    (err, vehicles) => {
      res.send(vehicles);
    }
  );
});

app.get("/getVehicleListWithfilter2/:value", (req, res) => {
  let filterValue = req.params.value;
  VehicleList.find(
    { toll: { $regex: filterValue } },
    null,
    { sort: { dateFormated: -1 } },
    (err, vehicles) => {
      res.send(vehicles);
    }
  );
});

app.get("/getTollListWithfilter/:value", (req, res) => {
  let filterValue = req.params.value;
  TollList.find(
    { name: { $regex: filterValue, $options: "i" } },
    null,
    { sort: { name: 1 } },
    (err, tolls) => {
      res.send(tolls);
    }
  );
});

app.post("/postVehicle", async (req, res) => {
  await VehicleList.insertMany([req.body], (err) => {
    if (err){
      console.log(err);
      res.status(500).json({ error: "Failed to insert vehicle" });
    } 
    else{
      console.log("inserted");
      res.status(201).json({ message: "Vehicle inserted successfully"});
    } 
  });
});

app.get("/getTollList", (req, res) => {
  TollList.find({}, null, { sort: { name: 1 } }, (err, tolls) => {
    res.send(tolls);
  });
});

app.post("/postToll", async (req, res) => {
  await TollList.insertMany([req.body], (err) => {
    if (err){
       console.log(err);
       res.status(500).json({ message: "Adding Toll Failed"});
    } 
    else{
       console.log("inserted");
       res.status(201).json({ message: "Toll Added successfully"});
    } 
  });
});

app.delete("/deleteToll/:delVal", (req, res) => {
  const tollName = req.params.delVal;

  TollList.findOneAndDelete({ name: tollName }, (err) => {
    if (err) console.log(err);
    else console.log("Toll Deleted");
  });
});

////////////////////////////////////////////////////////////////////

const transactionSchema = new mongoose.Schema({
  user: String,
  type: String,
  amount: String,
  description: String,
  date: String,
  id: Number,
});

const Transaction = mongoose.model("Transaction", transactionSchema);

app.get("/getTransactions", (req, res) => {
  Transaction.find(
    {},
    null,
    { sort: { date: -1 } },
    function (err, transactions) {
      res.send(transactions);
    }
  );
});

app.post("/postTransaction", (req, res) => {
  // console.log(req.body);
  Transaction.insertMany([req.body], (err) => {
    if (err) console.log(err);
    else console.log("inserted");
  });
});

app.get("/getYearlyIncome/:year", (req, res) => {
  const year = req.params.year;
  let value = 0;
  let value1 = "";
  Transaction.find({ type: "Income" }, (err, items) => {
    items.forEach((item) => {
      if (item.date.slice(0, 4) === year) {
        value += Number(item.amount);
        console.log(item);
      }
    });
    value1 = new String(value);
    res.send({ yearlyIncome: value1 });
  });
});

app.get("/getYearlyExpense/:year", (req, res) => {
  const year = req.params.year;
  let value = 0;
  let value1 = "";
  Transaction.find({ type: "Expense" }, (err, items) => {
    items.forEach((item) => {
      if (item.date.slice(0, 4) === year) {
        value += Number(item.amount);
        console.log(item);
      }
    });
    value1 = new String(value);
    res.send({ yearlyExpense: value1 });
  });
});

app.get("/getMonthlyIncome/:month", (req, res) => {
  const month = req.params.month;
  let value = 0;
  let value1 = "";
  Transaction.find({ type: "Income" }, (err, items) => {
    items.forEach((item) => {
      if (item.date.slice(0, 7) === month) {
        value += Number(item.amount);
        console.log(item);
      }
    });
    value1 = new String(value);
    res.send({ monthlyIncome: value1 });
  });
});

app.get("/getMonthlyExpense/:month", (req, res) => {
  const month = req.params.month;
  let value = 0;
  let value1 = "";
  Transaction.find({ type: "Expense" }, (err, items) => {
    items.forEach((item) => {
      if (item.date.slice(0, 7) === month) {
        value += Number(item.amount);
        console.log(item);
      }
    });
    value1 = new String(value);
    res.send({ monthlyExpense: value1 });
  });
});

app.get(
  "/getTransactionsWithFilter/:user/:type/:dateFrom/:dateTo",
  (req, res) => {
    const user = req.params.user;
    const type = req.params.type;
    const dateFrom = req.params.dateFrom;
    const dateTo = req.params.dateTo;
    // console.log(user,type,dateFrom,dateTo);
    Transaction.find(
      {},
      null,
      { sort: { date: -1 } },
      function (err, transactions) {
        let result = transactions;
        console.log(user);
        if (user !== "null") {
          result = result.filter((item) => {
            return item.user === user;
          });
        }
        if (type !== "null") {
          result = result.filter((item) => {
            return item.type === type;
          });
        }
        if (dateFrom !== "null") {
          result = result.filter((item) => {
            return item.date >= dateFrom;
          });
        }
        if (dateTo !== "null") {
          result = result.filter((item) => {
            return item.date <= dateTo;
          });
        }
        // console.log(result);
        res.send(result);
      }
    );
  }
);

app.delete("/deleteTransaction/:id", (req, res) => {
  const id = req.params.id;

  Transaction.findByIdAndDelete(id, (err) => {
    if (err) console.log(err);
    else console.log("deleted");
  });
});

//////////////////////////////////////////////////////////////////////

const pendingTableSchema = new mongoose.Schema({
  name: String,
  uniqueId: String,
});

const PendingTable = mongoose.model("PendingTable", pendingTableSchema);

const processedTableSchema = new mongoose.Schema({
  name: String,
  uniqueId: String,
});

const ProcessedTable = mongoose.model("ProcessedTable", processedTableSchema);

app.get("/apiSendRequest/:input", (req, res) => {
  let input = req.params.input;
  if (input.length > 10) {
    res.sendStatus(404);
    console.log("Length is less than 10");
    return;
  }

  // let found = false;
  // PendingTable.find({ name: input }, (err, pendingItems) => {
  //   if (pendingItems.length != 0) {
  //     found = true;
  //     console.log("Duplicate record");
  //   }
  // });

  // if (found) {
  //   res.sendStatus(404);
  //   return;
  // }

  let myuuid = uuidv4();

  let inputJson = {
    name: input,
    uniqueId: myuuid,
  };

  PendingTable.insertMany([inputJson], (err) => {
    if (err) console.log(err);
    else console.log("inserted");
  });
  res.sendStatus(200);
});

app.get("/processApiRequest/:processName/:processId", (req, res) => {
  PendingTable.find(
    { name: req.params.processName, uniqueId: req.params.processId },
    (err, pendingItems) => {
      if (pendingItems.length == 0) {
        res.send("Not found");
        console.log("Not found");
        return;
      } else {
        PendingTable.findOneAndDelete(
          { name: req.params.processName, uniqueId: req.params.processId },
          (err) => {
            if (err) console.log(err);
            else console.log("item Deleted");
          }
        );
        let inputJson = {
          name: req.params.processName,
          uniqueId: req.params.processId,
        };
        ProcessedTable.insertMany([inputJson], (err) => {
          if (err) console.log(err);
          else console.log("inserted");
        });
        res.send("Processed");
      }
    }
  );
});

app.get("/checkprocessSatus/:processName", (req, res) => {
  PendingTable.find({ name: req.params.processName }, (err, pendingItems) => {
    if (pendingItems.length == 0) {
      ProcessedTable.find(
        { name: req.params.processName },
        (err, processedItems) => {
          if (processedItems.length == 1) {
            res.send("Processed");
          } else {
            res.send("Not found");
          }
        }
      );
      return;
    } else {
      res.send("Still Pending");
    }
  });
});

//////////////////////////////////////////////////////////////////////

app.listen(PORT, () => {
  console.log("Server started ");
});
