// SPDX-License-Identifier: MIT

/// @title PAID Token V4 / Binance Smart Chain
/// @author PAID Network 2021.5 */pragma solidity 0.8.0;

pragma solidity 0.8.0;
pragma experimental ABIEncoderV2;

import "../lib/@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/utils/math/SafeMathUpgradeable.sol";
import "../lib/@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract PaidTokenV5 is Initializable, OwnableUpgradeable, ERC20PausableUpgradeable {
    using AddressUpgradeable for address;
	using SafeMathUpgradeable for uint256;
	using SafeERC20Upgradeable for IERC20Upgradeable;

    function initialize() initializer public {
        __Ownable_init();
        __ERC20_init('PAID Network', 'PAID');
        __ERC20Pausable_init();

	// Mint All TotalSuply in the Account OwnerShip
        _mint(owner(), getMaxTotalSupply());
    }

    function getMaxTotalSupply() public pure returns (uint256) {
        return 50000000000000000000000000;
    }

    function _mint(address account, uint256 amount) internal override {
        uint256 totalSupply_ = super.totalSupply();
        require(getMaxTotalSupply() >= totalSupply_.add(amount), "Max total supply over");

        super._mint(account, amount);
    }

    function getTimestamp() external view returns (uint256) {
        return block.timestamp;
    }

    function transferMany(address[] calldata recipients, uint256[] calldata amounts)
        external
	    onlyOwner()
    {
        require(recipients.length == amounts.length, "PAID Token: Wrong array length");

        uint256 total = 0;
        for (uint256 i = 0; i < amounts.length; i++) {
            total = total.add(amounts[i]);
        }

	    _balances[msg.sender] = _balances[msg.sender].sub(total, "ERC20: transfer amount exceeds balance");

        for (uint256 i = 0; i < recipients.length; i++) {
            address recipient = recipients[i];
            uint256 amount = amounts[i];
            require(recipient != address(0), "ERC20: transfer to the zero address");

            _balances[recipient] = _balances[recipient].add(amount);
            emit Transfer(msg.sender, recipient, amount);
        }
    }

    function withdraw(uint256 amount) public onlyOwner() {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = _msgSender().call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

	function withdrawToken(IERC20Upgradeable _token, uint256 amount) public onlyOwner() returns (bool) {
		require(IERC20Upgradeable(_token).balanceOf(address(this)) >= amount, "Address: insufficient balance");
		IERC20Upgradeable(_token).safeTransfer(
			_msgSender(),
			amount
		);
		return true;
	}

    function pause(bool status) public onlyOwner() {
        if (status) {
            _pause();
        } else {
            _unpause();
        }
    }

    function burn(uint256 amount) external onlyOwner {
        _burn(msg.sender, amount);
    }
}
