const main = async () => {
    const EunomiaFactory = await hre.ethers.getContractFactory('Eunomia');
    const Eunomia = await EunomiaFactory.deploy({
      value: hre.ethers.utils.parseEther('0.1'),
    });
    await Eunomia.deployed();
    console.log('Contract addy:', Eunomia.address);
  
    /*
     * Get Contract balance
     */
    let contractBalance = await hre.ethers.provider.getBalance(
      Eunomia.address
    );
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    /*
     * Send Wave
     */
    let dumpTxn = await Eunomia.send_eth(4, 125);
    await dumpTxn.wait();
  
    /*
     * Get Contract balance to see what happened!
     */
    contractBalance = await hre.ethers.provider.getBalance(Eunomia.address);
    console.log(
      'Contract balance:',
      hre.ethers.utils.formatEther(contractBalance)
    );
  
    let alldumps = await Eunomia.get_weight();
    console.log(alldumps);

    let allpaid = await Eunomia.get_paid();
    console.log(allpaid);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();