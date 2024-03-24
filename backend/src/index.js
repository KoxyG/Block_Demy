const contractAbi = require("./contractAbi");
// import { AdvanceRoute, Router } from "cartesi-router";
// import { Wallet, Notice, Error_out, Voucher } from "cartesi-wallet";
const { encodeFunctionData, getAddress, hexToBytes } = require("viem");

const { CartesifyBackend } = require("@calindra/cartesify-backend")

let derollApp
CartesifyBackend.createDapp().then(dapp => {
    dapp.start().catch((e) => {
        console.error(e);
        process.exit(1);
    });
    derollApp = dapp
});



const { ethers } = require("ethers");
const rollup_server = process.env.ROLLUP_HTTP_SERVER_URL;
console.log("HTTP rollup_server url is " + rollup_server);
const contractAddress = getAddress("0xD6a630A8E576Ad3721a96896a7BF934Fc0c79FD0");
let Network = "localhost";
if (Network === undefined) {
  Network = "localhost";
}

const express = require("express");

const app = express();
const port = 8383;

app.use(express.json());

app.post("/instructor/register", async (req, res) => {
    const senderAddress = req.header("x-msg_sender");
    console.log("RegisterInstructor..", senderAddress, req.body);
    const call = encodeFunctionData({
      abi: contractAbi,
      functionName: "registerInstructor",
      args: [req.body.instructor, req.body.courseName, req.body.certificateURI, req.body.courseFee],
    })
    await derollApp.createVoucher({
      destination: contractAddress,
      payload: call
    })
    res.send({ some: "response", senderAddress });
});

app.post("/other-function", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("RegisterInstructor..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "registerInstructor",
    args: [req.body.instructor, req.body.courseName, req.body.certificateURI, req.body.courseFee],
  })
  derollApp.createVoucher({
    destination: contractAddress,
    payload: call
  })
  res.send({ some: "response", senderAddress });
});

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});

// const wallet = new Wallet(new Map());
// const router = new Router(wallet)


// class RegisterInstructor extends AdvanceRoute {
//   execute=(request)=>{
//     this.parse_request(request);
//     console.log("RegisterInstructor..");
//     const call=encodeFunctionData({
//       abi: contractAbi,
//       functionName: "registerInstructor",
//       args: [this._instructor, this._courseName, this._certificateURI, this._courseFee],
//     })
//     return new Voucher(contractAddress, call);
//   }
// }

// router.addRoute("register instructor", new RegisterInstructor(wallet))

// async function handle_advance(data) {
//   console.log("Received advance request data " + JSON.stringify(data));
//   return "accept";
// }

// async function handle_inspect(data) {
//   console.log("Received inspect request data " + JSON.stringify(data));
//   return "accept";
// }

// var handlers = {
//   advance_state: handle_advance,
//   inspect_state: handle_inspect,
// };

// var finish = { status: "accept" };

// (async () => {
//   while (true) {
//     const finish_req = await fetch(rollup_server + "/finish", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ status: "accept" }),
//     });

//     console.log("Received finish status " + finish_req.status);

//     if (finish_req.status == 202) {
//       console.log("No pending rollup request, trying again");
//     } else {
//       const rollup_req = await finish_req.json();
//       var handler = handlers[rollup_req["request_type"]];
//       finish["status"] = await handler(rollup_req["data"]);
//     }
//   }
// })();