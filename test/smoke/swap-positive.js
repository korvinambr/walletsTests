const assert = require('assert')
const driverModule = require("../../wallets/libs/buildDriver");

const {profilePath, appPath} = require('../../configs/paths');
const {robot, teleport} = require('../../configs/urls');

const {sellAmount, buyAmount, buyAmountId, swapBtnId, checkTxMsg, checkTxTextId,
  pleaseWaitId, pleaseWaitMsg, txUrlId, fuckBtnId, continueBtnId
} = require('../../wallets/keplr/pages/robot');

const {applyBtnId} = require('../../wallets/keplr/pages/keplr');
const {
  getElAttrValue, clickOnElement, getElText, ensureOneWindowsOpen, ensureElPresentDOM,
  closeWindow, checkWindowHandle, navigateToUrl, switchToNewWindow, switchToOriginalWindow2,
  setPassword, setTokenAmount, switchToOriginalWindow, chooseBuyToken, chooseSellToken, clearTokenAmount,
  chooseBtnClick, findElementEngineByText } = require('../../wallets/libs/webdriverRelated');

const {takeScreenshot} = require('../../wallets/libs/fsRelated');
let driver = new driverModule(profilePath, appPath);
let defaultWindow;

describe.skip('Full positive scenario."space-pussy-1" + "BOOT" -> "space-pussy-1" + "H"', () => {

  before(async () => {
    defaultWindow = await checkWindowHandle(driver.getDriver());
    await navigateToUrl(driver.getDriver(), robot);
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await setPassword(driver.getDriver());
    await switchToOriginalWindow(driver.getDriver(), defaultWindow, []);
    await navigateToUrl(driver.getDriver(), teleport);
  });

  it('User sets BOOT amount (100 BOOT). It sees Hydrogen amount, according current rate',
    async () => {
    await setTokenAmount(driver.getDriver(), sellAmount);
    let el = await getElAttrValue(driver.getDriver(), buyAmountId);
    await assert.equal(Math.round(el), buyAmount);
  });

  it('User clicks on SWAP button. Wallet window contains APPROVE button', async () => {
    await clickOnElement(driver.getDriver(), swapBtnId);
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    let el = await getElText(driver.getDriver(), applyBtnId);
    await assert.equal(el, 'Approve');
  });

  it('User clicks on SWAP button. "Check the transaction" element with status indicator appeared',
    async () => {
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await getElText(driver.getDriver(), checkTxTextId);
    await assert.equal(el, checkTxMsg);
  });

  it('User approves transaction. Wallet window closes', async () => {
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await assert.equal(el, true);
  });

  it('User approves transaction."Please wait while we confirm the transaction on the blockchain" element with status indicator is present', async () => {
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await getElText(driver.getDriver(),pleaseWaitId);
    await assert.equal(el, pleaseWaitMsg)
  });

  it('User approves transaction. String, containing message to user, link ro explorer and block height appeared', async() => {
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
  })

  after(async () => {
    await closeWindow(driver.getDriver());
  })
});

describe('Positive. Swap tokens inside "Cyber-testnet"  ', () => {
  before(async () => {
    defaultWindow = await checkWindowHandle(driver.getDriver());
    await navigateToUrl(driver.getDriver(), robot);
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await setPassword(driver.getDriver());
    await switchToOriginalWindow(driver.getDriver(), defaultWindow, []);
    await navigateToUrl(driver.getDriver(), teleport);
  });

  /**
   *    1 2 3
   *  1   x x
   *  2 x   x
   *  3 x x
   */

  it('Swaps token 1 to token 2. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 0);
    await chooseBuyToken(driver.getDriver(), 1);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps token 1 to token 3. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 0);
    await chooseBuyToken(driver.getDriver(), 2);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps token 2 to token 1. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 1);
    await chooseBuyToken(driver.getDriver(), 0);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps token 2 to token 3. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 1);
    await chooseBuyToken(driver.getDriver(), 2);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps token 3 to token 1. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 2);
    await chooseBuyToken(driver.getDriver(), 0);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps token 3 to token 2. EXPECTING SUCCESS', async () => {
    await chooseSellToken(driver.getDriver(), 2);
    await chooseBuyToken(driver.getDriver(), 1);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await switchToNewWindow(driver.getDriver(), defaultWindow);
    await takeScreenshot(driver.getDriver());
    await clickOnElement(driver.getDriver(), applyBtnId);
    await switchToOriginalWindow2(driver.getDriver(), defaultWindow);
    let el = await ensureElPresentDOM(driver.getDriver(), txUrlId);
    await assert.equal(el, true);
    await clickOnElement(driver.getDriver(), fuckBtnId);
  });

  it('Swaps token 1 to token 1. EXPECTING ERROR', async () => {
    await chooseSellToken(driver.getDriver(), 0);
    await chooseBuyToken(driver.getDriver(), 0);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await clickOnElement(driver.getDriver(), continueBtnId);
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await takeScreenshot(driver.getDriver());
    await assert.equal(el, true);
  });

  it('Swaps token 2 to token 2. EXPECTING ERROR', async () => {
    await chooseSellToken(driver.getDriver(), 1);
    await chooseBuyToken(driver.getDriver(), 1);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    await clickOnElement(driver.getDriver(), continueBtnId);
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await takeScreenshot(driver.getDriver());
    await assert.equal(el, true);
  });

  it('Swaps token 3 to token 3. EXPECTING ERROR', async () => {
    await chooseSellToken(driver.getDriver(), 2);
    await chooseBuyToken(driver.getDriver(), 2);
    await clearTokenAmount(driver.getDriver());
    await setTokenAmount(driver.getDriver(), '100');
    await chooseBtnClick(driver.getDriver());
    let el = await ensureOneWindowsOpen(driver.getDriver());
    await takeScreenshot(driver.getDriver());
    await assert.equal(el, true);
  });
})