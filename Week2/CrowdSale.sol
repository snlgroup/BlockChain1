pragma solidity ^0.4.24;

//import "./ERC20.sol";
import "./SafeMath.sol";
import "./ERC20Test.sol";

contract Crowdsale {
    using SafeMath for uint256;

    uint256 private cap; // maximum amount of ether to be raised
    uint256 private weiRaised; // current amount of wei raised

    uint256 private rate; // price in wei per smallest unit of token (e.g. 1 wei = 10 smallet unit of a token)
    address private wallet; // wallet to hold the ethers
    IERC20 private token; // address of erc20 tokens

   /**
    * Event for token purchase logging
    * @param purchaser who paid for the tokens
    * @param beneficiary who got the tokens
    * @param value weis paid for purchase
    * @param amount amount of tokens purchased
    */
    event TokensPurchased(
        address indexed purchaser,
        address indexed beneficiary,
        uint256 value,
        uint256 amount
    );

    // -----------------------------------------
    // Public functions (DO NOT change the interface!)
    // -----------------------------------------
   /**
    * @param _rate Number of token units a buyer gets per wei
    * @dev The rate is the conversion between wei and the smallest and indivisible token unit.
    * @param _wallet Address where collected funds will be forwarded to
    * @param _token Address of the token being sold
    */
    constructor(uint256 _rate, address _wallet, IERC20 _token, uint256 _cap) public {
        // TODO: Your Code Here
        
        wallet = _wallet;
        rate = _rate;
        token = _token;
        cap = _cap;
        weiRaised = 0;   
    }

    /**
    * @dev Fallback function for users to send ether directly to contract address
    */
    function() external payable {
        // TODO: Your Code Here
        //require(msg.data.length == 0);
        buyTokens(msg.sender);
        
    }


  

    function buyTokens(address beneficiary) public payable {
        // Below are some general steps that should be done.
        // You need to decide the right order to do them in.
        //  - Validate any conditions
        //  - Calculate number of tokens
        //  - Update any states
        //  - Transfer tokens and emit event
        //  - Forward funds to wallet
        
        // TODO: Your Code Here
        uint256 tknAmount;
        uint256 capLeft;
        uint256 ethSpent;
       
         

        capLeft = cap.sub(weiRaised.div(10e18));
        ethSpent = msg.value.div(10e18);
      
        
        // Check to see if cap reached -> the number of ethers raised reached
        require(capReached ());
        require(msg.value > 0);

    
         // If more tokens can be purchased accept paymen
        if (msg.value > capLeft) {
            ethSpent  = capLeft;
        }
  
        // convert ether to wei to calculate amount of tokens to be purchased
        tknAmount = ethSpent.mul(10e18).mul(rate);
       
        // send ether from buyer to wallet
        wallet.transfer(ethSpent);
        //transWei(msg.sender, wallet, weiSpent);
       
        // update wei to date
        weiRaised = weiRaised.add(ethSpent.mul(10e18));
       
        // transfer tokens to buyers wallet
        token.transfer(beneficiary, tknAmount);
       
        // log transaction
        emit TokensPurchased(msg.sender,beneficiary,ethSpent,tknAmount);

    }

    /**
    * @dev Checks whether the cap has been reached.
    * @return Whether the cap was reached
    */
    function capReached() public view returns (bool) {
        // TODO: Your Code Here
         return weiRaised.div(10e18) < cap;
        
    }


    // -----------------------------------------
    // Internal functions (you can write any other internal helper functions here)
    // -----------------------------------------
    
   // function transWei (address _buyer, address _seller, uint256 _amt) internal {
        //ethers.getBalance(_buyer) -=  _amt; 
        //ethers.getBalance(_seller) += _amt;
        
        // _seller.transfer(_amt);
       // .balance(_buyer) -=  _amt; 
       // .balance(_seller) +=  _amt; 
    //}



    function totweiR() public view returns (uint256) {
    // TODO: Your Code Here
    
        return weiRaised;
    }
  
  
}


