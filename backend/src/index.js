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

<<<<<<< HEAD
=======
//Viem
>>>>>>> f4751c3 (still working)
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

<<<<<<< HEAD
=======

// //etherjs
// app.post("/instructorRegister", async (req, res) => {
//   const senderAddress = req.header("x-msg_sender");
//   console.log("RegisterInstructor..", senderAddress, req.body);

//   try {
//     // Initialize provider and signer
//     const provider = ethers.getDefaultProvider("http://localhost:8545");

//     // Initialize contract instance
//     const contract = new ethers.Contract(contractAddress, contractAbi, signer);

//     // Call registerInstructor function
//     const call = await contract.registerInstructor(
//       getAddress(senderAddress),
//       req.body.courseName,
//       req.body.certificateURI,
//       BigInt(req.body.courseFee)
//     );
//     await call.wait();
//     await derollApp.createVoucher({
//       destination: contractAddress,
//       payload: call
//     })

//     // Wait for the transaction to be mined
    

//     console.log("Transaction Hash:", tx.hash);

//     res.send({ some: "response", senderAddress });
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).send({ error: "Internal Server Error" });
//   }
// });



>>>>>>> f4751c3 (still working)
app.post("/purchaseModule", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("purchaseModule..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "purchaseModule",
    args: [req.body.moduleIndex],
<<<<<<< HEAD
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

app.post("/registerStudent", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("registerStudent..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "registerStudent",
    args: [req.header("x-msg_sender")],
=======
>>>>>>> f4751c3 (still working)
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

// viem
app.post("/registerStudent", (req, res) => {
  const senderAddress = req.header("x-msg_sender");
  console.log("registerStudent..", senderAddress, req.body);
  const call = encodeFunctionData({
    abi: contractAbi,
    functionName: "registerStudent",
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
<<<<<<< HEAD

=======
>>>>>>> f4751c3 (still working)
