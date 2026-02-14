
var MedianFinder = function () {
  this.sum = 0;
  this.median = null;
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function (num) {
  this.sum = 
  this.median = num;
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function () {

};


[1]    => isEven = false => median = num
[1, 2] => isEven = true  => median = num + prev
[1, 2, 3] => isEven = false => median = prev
[1, 2, 3, 4] => isEven = true => median = prev + prevMedian
[1, 2, 3, 4, 5] => isEven = false => median = prev + 

