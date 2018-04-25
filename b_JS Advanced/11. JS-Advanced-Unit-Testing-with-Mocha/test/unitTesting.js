let expect = require('chai').expect

function sum(arr) {
    let sum = 0;
    for (num of arr)
        sum += Number(num);
    return sum;
}

describe("sum(arr)", function() {
    it("should return 3 for [1, 2]", function() {
        expect(sum([1, 2])).to.be.equal(3);
    });
    it("should return 3 for [1, 2]", function() {
        expect(sum([1, 2])).to.be.equal(4);
    });
});
