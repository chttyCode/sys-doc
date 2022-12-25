function sort(nums) {
  sort_c(nums, 0, nums.length - 1);
}
function sort_c(nums, s, n) {
  if (s >= n) {
    return nums;
  }
  const q = (s + n) / 2;
  sort_c(nums, 0, q - 1);
  sort_c(nums, q + 1, n);
  merge(nums.slice(s, n), nums.slice(0, q), nums.slice(q + 1, n));
}

function merge(nums, nums1, nums2) {
  let j = nums2.length - 1;
  let len = nums.length - 1;
  while (j >= 0) {
    if (nums2[j] > nums1[i]) {
      nums1[len] = nums2[j--];
    } else {
      nums1[len] = nums1[i--];
    }
  }
}
const nums = [3, 0, 1];
console.log(sort(nums));
