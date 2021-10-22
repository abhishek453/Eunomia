const main = async () => {
    const eunomiaContractFactory = await hre.ethers.getContractFactory('Eunomia');
    const eunomiaContract = await eunomiaContractFactory.deploy({
      value: hre.ethers.utils.parseEther('0.001'),
    });
  
    await eunomiaContract.deployed();
  
    console.log('Eunomia address: ', eunomiaContract.address);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  runMain();