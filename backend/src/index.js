const contractAbi = require("./contractAbi");
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

app.post("/instructorRegister", async (req, res) => {
    const senderAddress = req.header("x-msg_sender");
    console.log("RegisterInstructor..", senderAddress, req.body);
    const call = encodeFunctionData({
      abi: contractAbi,
      functionName: "registerInstructor",
      args: [getAddress(senderAddress), req.body.courseName, req.body.certificateURI, BigInt(req.body.courseFee)],
    })
    await derollApp.createVoucher({
      destination: contractAddress,
      payload: call
    })
    res.send({ some: "response", senderAddress });
});

app.post("/purchaseModule", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("purchaseModule..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "purchaseModule",
    args: [req.body.moduleIndex],
  })
  derollApp.createVoucher({
    destination: contractAddress,
    payload: call
  })
  res.send({ some: "response", senderAddress });
});


app.post("/purchaseModule", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("purchaseModule..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "purchaseModule",
    args: [req.body.moduleIndex],
  })
  derollApp.createVoucher({
    destination: contractAddress,
    payload: call
  })
  res.send({ some: "response", senderAddress });
});

app.post("/claimCertificate", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("claimCertificate..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "claimCertificate",
    args: [req.body.moduleIndex],
  })
  derollApp.createVoucher({
    destination: contractAddress,
    payload: call
  })
  res.send({ some: "response", senderAddress });
});

app.post("/claimCertificate", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("claimCertificate..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "claimCertificate",
    args: [req.body.moduleIndex],
  })
  derollApp.createVoucher({
    destination: contractAddress,
    payload: call
  })
  res.send({ some: "response", senderAddress });
});


app.post("/removeAdmin", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("removeAdmin..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "removeAdmin",
    args: [req.header("x-msg_sender")],
  })
  derollApp.createVoucher({
    destination: contractAddress,
    payload: call
  })
  res.send({ some: "response", senderAddress });
});


app.post("/addAdmin", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("addAdmin..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "addAdmin",
    args: [req.header("x-msg_sender")],
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

