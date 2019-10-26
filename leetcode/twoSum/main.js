/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
    let tempMap = new Map();
    for(let i = 0; i<nums.length;i++){
        let left = target-nums[i];
        if(tempMap.has(left)){
            return [tempMap.get(left),i];
        }
        tempMap.set(nums[i],i);
    }  
};

var twoSum = function(nums, target) {
    let tempMap = {};
    for(let i = 0; i<nums.length;i++){
        let left = target-nums[i];
        if(tempMap[left]){
            return [tempMap[left],i];
        }
        tempMap[nums[i]] = i;
    }  
};

twoSum([2,3,4,5,6,7,8],9);