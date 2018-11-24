pragma solidity ^0.4.24;

import './ERC721.sol';

contract CryptoBallers is ERC721 {

    struct Baller {
        string name;
        uint level;
        uint offenseSkill;
        uint defenseSkill;
        uint winCount;
        uint lossCount;
    }

    address owner;
    Baller[] public ballers;

    //Lopes additions
    address wallet;
    uint256 private tokenID;

    // Mapping for if address has claimed their free baller
    mapping(address => bool) claimedFreeBaller;

    // Fee for buying a baller
    uint ballerFee = 0.10 ether;

    /**
    * @dev Ensures ownership of the specified token ID
    * @param _tokenId uint256 ID of the token to check
    */
    modifier onlyOwnerOf(uint256 _tokenId) {
        // TODO add your code
        require(_exists(_tokenId));
        require (msg.sender == ownerOf(_tokenId));
        _;
    }

    /**
    * @dev Ensures ownership of contract
    */
    modifier onlyOwner() {
        // TODO add your code
        require(msg.sender == owner);
        _;
    }

    /**
    * @dev Ensures baller has level above specified level
    * @param _level uint level that the baller needs to be above
    * @param _ballerId uint ID of the Baller to check
    */
    modifier aboveLevel(uint _level, uint _ballerId) {
        // TODO add your code
        require (ballers[_ballerId].level > _level);
        _;
    } 


    constructor() public {
        owner = msg.sender;

        //Lopes modifications
        tokenID = 0;
        wallet = owner;
    }

    /**
    * @dev Allows user to claim first free baller, ensure no address can claim more than one
    */
    function claimFreeBaller() public {
        // TODO add your code   - need to get last index to add as ballers parameter
        
        require(claimedFreeBaller[msg.sender] != true);
        _createBaller ("Rookie Baller", 1, 3, 2);
         claimedFreeBaller[msg.sender] = true;

    }

    /**
    * @dev Allows user to buy baller with set attributes
    */
    function buyBaller() public payable {
        // TODO add your code
        require(msg.value >= ballerFee);

        uint256 noOfBallers = msg.value.div(ballerFee);

        for(uint i = 0; i < noOfBallers; i++){
            _createBaller ("Sophmore Baller", 1, 4, 4);
        }
        
        // send ether from buyer to wallet
        wallet.transfer(msg.value);
        
    }

    /**
    * @dev Play a game with your baller and an opponent baller
    * If your baller has more offensive skill than your opponent's defensive skill
    * you win, your level goes up, the opponent loses, and vice versa.
    * If you win and your baller reaches level 5, you are awarded a new baller with a mix of traits
    * from your baller and your opponent's baller.
    * @param _ballerId uint ID of the Baller initiating the game
    * @param _opponentId uint ID that the baller needs to be above
    */
    function playBall(uint _ballerId, uint _opponentId) onlyOwnerOf(_ballerId) public {
       // TODO add your code
        Baller storage b = ballers[_ballerId];
        Baller storage o = ballers[_opponentId];
      
        if(b.offenseSkill > o.defenseSkill) {

            b.level = b.level + 1;
            b.winCount = b.winCount + 1;
            o.lossCount = o.lossCount + 1;
            
            ballers[_ballerId] = b;
            ballers[_opponentId] = o;

            if(b.level == 5) {
                
                //uint[3] memory tmpArray;

                (uint x, uint y, uint z) = _breedBallers(b, o);
                _createBaller("Bonus Baller", x, y, z);
             
            }
        } else {
            
            o.level = o.level + 1;
            o.winCount = o.winCount + 1;
            b.lossCount = b.lossCount + 1;
            
            ballers[_ballerId] = b;
            ballers[_opponentId] = o;

        }
    }

    /**
    * @dev Changes the name of your baller if they are above level two
    * @param _ballerId uint ID of the Baller who's name you want to change
    * @param _newName string new name you want to give to your Baller
    */
    function changeName(uint _ballerId, string _newName) external aboveLevel(2, _ballerId) onlyOwnerOf(_ballerId) {
        // TODO add your code
        ballers[_ballerId].name = _newName;

    }

    /**
   * @dev Creates a baller based on the params given, adds them to the Baller array and mints a token
   * @param _name string name of the Baller
   * @param _level uint level of the Baller
   * @param _offenseSkill offensive skill of the Baller
   * @param _defenseSkill defensive skill of the Baller
   */
    function _createBaller(string _name, uint _level, uint _offenseSkill, uint _defenseSkill) internal {
        // TODO add your code
        //get last index of baller array
            
        _mint(msg.sender, tokenID);
        require(_exists(tokenID));
        ballers.push(Baller(_name, _level, _offenseSkill, _defenseSkill, 0, 0));

        tokenID = tokenID.add(1);

    }

    /**
    * @dev Helper function for a new baller which averages the attributes of the level, attack, defense of the ballers
    * @param _baller1 Baller first baller to average
    * @param _baller2 Baller second baller to average
    * @return tuple of level, attack and defense
    */
    function _breedBallers(Baller _baller1, Baller _baller2) internal pure returns (uint, uint, uint) {
        uint level = _baller1.level.add(_baller2.level).div(2);
        uint attack = _baller1.offenseSkill.add(_baller2.offenseSkill).div(2);
        uint defense = _baller1.defenseSkill.add(_baller2.defenseSkill).div(2);
        return (level, attack, defense);

    }
    

    function reTokenID() public view returns (uint) {
      return tokenID;
    }
    
}