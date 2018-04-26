const SubscriptionCard = require('../SubscriptionCard')
const expect = require('chai').expect


describe("SubscriptionCard tests", function() {
    let card

    beforeEach(function () {
        card = new SubscriptionCard('first', 'last', 12)
    })

    it("first name", function() {
        expect(card.firstName).to.be.equal('first')
    });

    it("first name 2", function() {
        card.firstName = 'az'
        expect(card.firstName).to.be.equal('first')
    });

    it("last name", function() {
        expect(card.lastName).to.be.equal('last')
    });

    it("last name 2", function() {
        card.lastName = 'az'
        expect(card.lastName).to.be.equal('last')
    });

    it("ssn", function() {
        expect(card.SSN).to.be.equal(12)
    });

    it("ssn 2", function() {
        card.SSN = 1
        expect(card.SSN).to.be.equal(12)
    });

    it("isBlocked initial", function() {
        expect(card.isBlocked).to.be.equal(false)
    });

    it("isBlocked initial 2", function() {
        card.isBlocked = true
        expect(card.isBlocked).to.be.equal(false)
    });

    it("isBlocked initial 3", function() {
        card.block()
        card.isBlocked = false
        expect(card.isBlocked).to.be.equal(true)
    });

    it("isBlocked true", function() {
        card.block()
        expect(card.isBlocked).to.be.equal(true)
    });

    it("isBlocked false", function() {
        card.block()
        card.unblock()
        expect(card.isBlocked).to.be.equal(false)
    });

    it("addSubscription", function() {
        let input = {
            line: '120',
            startDate: new Date('2018-04-22'),
            endDate: new Date('2018-05-21')
        }

        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        let res = card._subscriptions.pop()
        expect(res).to.deep.equal(input)
    });

    it("isValid when blocked", function() {
        card.block()
        expect(card.isValid()).to.be.equal(false)
    });

    it("isValid 1-true", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-04-22'))).to.be.equal(true)
    });

    it("isValid 1-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-04-21'))).to.be.equal(false)
    });

    it("isValid 2-true", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-05-21'))).to.be.equal(true)
    });

    it("isValid 2-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('120', new Date('2018-05-22'))).to.be.equal(false)
    });

    it("isValid 3-true", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('', new Date('2018-05-21'))).to.be.equal(true)
    });

    it("isValid 3-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('', new Date('2018-05-22'))).to.be.equal(false)
    });

    it("isValid 4-true", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('', new Date('2018-04-22'))).to.be.equal(true)
    });

    it("isValid 4-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('*', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('', new Date('2018-04-21'))).to.be.equal(false)
    });

    it("isValid 5-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('*', undefined, new Date('2018-05-21'));
        expect(card.isValid('', new Date('2018-04-21'))).to.be.equal(false)
    });

    it("isValid 5-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('*', new Date('2018-04-22'), undefined);
        expect(card.isValid('', new Date('2018-04-21'))).to.be.equal(false)
    });

    it("isValid 6-false", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription(undefined, new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('', new Date('2018-04-21'))).to.be.equal(false)
    });

    it("isValid 7-true", function() {
        card.addSubscription('123', new Date('2000-04-22'), new Date('2000-05-21'));
        card.addSubscription('120', new Date('2018-04-22'), new Date('2018-05-21'));
        expect(card.isValid('12', new Date('2018-04-22'))).to.be.equal(false)
    });

});
