/**
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 * 输入: nums = [1,2,3,4,5,6,7], k = 3
输出: [5,6,7,1,2,3,4]
 */
var rotate = function(nums, k) {
  k = k % nums.length;
  nums.unshift(...nums.splice(-k));
  return nums;
};
// 申请额外数组，将
var rotate1 = function(nums, k) {
  let pre = 0;
  let next = k;
  while (pre < k) {}
};
console.log(rotate([1, 2, 3, 4, 5, 6, 7], 3));
