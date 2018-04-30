// const Article = require('mongoose').model('Article');
const Match = require('mongoose').model('Match');
const Bet = require('mongoose').model('Bet');
const User = require('mongoose').model('User');

let dt = function (num) {
    return Number(num) < 10 ? '0' + num : num
}

let calcPoints = function (match, bet) {
    if (match.goal1 === undefined) {
        return ''
    } else if (match.goal1 === bet.goal1 && match.goal2 === bet.goal2) {
        return 3
    } else if (match.goal1 > match.goal2 && bet.goal1 > bet.goal2) {
        return 1
    } else if (match.goal1 < match.goal2 && bet.goal1 < bet.goal2) {
        return 1
    } else if (match.goal1 === match.goal2 && bet.goal1 === bet.goal2) {
        return 1
    } else {
        return 0
    }
}

let getClassName = function (points) {
    if (points === '') {
        return ''
    } else if (points == 1) {
        return ' match'
    } else if (points == 3) {
        return ' totalmatch'
    } else {
        return ' nomatch'
    }
}

let getGroupResults = function (id, users, matches, bets) {
    // console.log(users);
    // Match.find({group: id}).then(matches => {
    //     // console.log(matches);
    //     Bet.find({group: id}).populate('match').populate('author').then(bets => {
            let matchesArr = []
            let resultsArr = []
            let bonusArr = []
            let roundArr = []
            // let currentUser = req.isAuthenticated() ? req.user.userName : ''
            // let admin = req.isAuthenticated() && req.user.admin ? true : false
            // console.log('currentUser:' + currentUser);
            for (let match of matches) {
                if (match.group !== id) {continue}
                let matchObj = {
                    team1: match.team1,
                    team2: match.team2,
                    result: match.goal1 === undefined ? 'няма' : match.goal1 + ' : ' + match.goal2,
                    date: dt(match.date.getDate())  + "." + dt(match.date.getMonth()+1) + " " + dt(match.date.getHours()) + ":" + dt(match.date.getMinutes()),
                    bets: [],
                    group: match.group
                }
                // if (admin) {
                //     matchObj.href = match.id
                // }
                // console.log('Match date: ' + match.date);
                // console.log('Now:        ' + new Date(Date.now()));
                // let passed = match.date > new Date(Date.now())
                // console.log(passed);

                // let test = match.date - new Date(Date.now())
                // console.log('Time diff: ' + test);

                let i = 0
                for (let user of users) {

                    // let isCurrent = (user.userName === currentUser) && (match.date > new Date(Date.now()))
                    let betObj = {}
                    let foundBet = false
                    for (let bet of bets) {
                        if (bet.author.userName === user.userName && bet.match.id === match.id) {
                            // console.log('Found bet:');
                            // console.log(bet);
                            betObj.result = bet.goal1 + ' : ' + bet.goal2
                            betObj.href = 'bet/' + bet.id
                            betObj.points = calcPoints(match, bet)
                            betObj.className = getClassName(betObj.points)
                            // ff.bets.push(betObj)
                            foundBet = true
                            break
                        }
                    }
                    if (!foundBet) {
                        betObj.href = 'newbet/' + match.id
                        betObj.points = 0
                        betObj.result = 'няма'
                    }
                    matchObj.bets.push(betObj)

                    if (resultsArr[i] === undefined) {resultsArr[i] = 0}
                    resultsArr[i] += Number(betObj.points)

                    i++
                }

                // console.log('Match object: ');
                // console.log(matchObj);

                matchesArr.push(matchObj)
            }


            let max = Math.max(...resultsArr)

            // let max = resultsArr.math.max()
            // console.log(max);

            for (let i = 0; i < resultsArr.length; i++) {
                bonusArr[i] = resultsArr[i] === max ? 5 : '';
                roundArr[i] = resultsArr[i] === max ? resultsArr[i] + 5 : resultsArr[i];
            }


            // console.log('resultsArr: ');
            // console.log(resultsArr);

            // console.log('bonusArr:');
            // console.log(bonusArr);
            // console.log(roundArr);
            // console.log(f);
            // res.render('home/index', {users: users, matches: matchesArr, total: {round: resultsArr, bonus: bonusArr}});
            return roundArr
    //     })
    //
    // })

}

module.exports = {
    roundGet: (req, res) => {
        let id = Number(req.params.id)

        User.find({}).populate('bets').then(users => {
            // console.log(users);

            // Match.find({group: id}).then(matches => {
            Match.find({}).where('group').lt(id + 1).sort({date: 1}).then(matches => {
            // Match.find({group: { $gt: 0, $lt: id + 1 }}).then(matches => {
                // console.log(matches);
                Bet.find({}).where('group').lt(id + 1).populate('match').populate('author').then(bets => {
                    let matchesArr = []
                    let resultsArr = []
                    let bonusArr = []
                    let roundArr = []
                    let currentUser = req.isAuthenticated() ? req.user.userName : ''
                    let admin = req.isAuthenticated() && req.user.admin ? true : false
                    // console.log('currentUser:' + currentUser);
                    for (let match of matches) {

                        let matchObj = {
                            team1: match.team1,
                            team2: match.team2,
                            result: match.goal1 === undefined ? 'няма' : match.goal1 + ' : ' + match.goal2,
                            date: dt(match.date.getDate())  + "." + dt(match.date.getMonth()+1) + " " + dt(match.date.getHours()) + ":" + dt(match.date.getMinutes()),
                            bets: []
                        }
                        if (admin) {
                            matchObj.href = match.id
                        }
                        // console.log('Match date: ' + match.date);
                        // console.log('Now:        ' + new Date(Date.now()));
                        // let passed = match.date > new Date(Date.now())
                        // console.log(passed);

                        // let test = match.date - new Date(Date.now())
                        // console.log('Time diff: ' + test);

                        let i = 0
                        for (let user of users) {

                            let isCurrent = (user.userName === currentUser) && (match.date > new Date(Date.now()))
                            let betObj = {current: isCurrent}
                            let foundBet = false
                            for (let bet of bets) {
                                if (bet.author.userName === user.userName && bet.match.id === match.id) {
                                    // console.log('Found bet:');
                                    // console.log(bet);
                                    betObj.result = bet.goal1 + ' : ' + bet.goal2
                                    betObj.href = 'bet/' + bet.id
                                    betObj.points = calcPoints(match, bet)
                                    betObj.className = getClassName(betObj.points)
                                    // ff.bets.push(betObj)
                                    foundBet = true
                                    break
                                }
                            }
                            if (!foundBet) {
                                betObj.href = 'newbet/' + match.id
                                betObj.points = 0
                                betObj.result = 'няма'
                            }
                            matchObj.bets.push(betObj)

                            if (resultsArr[i] === undefined) {resultsArr[i] = 0}
                            resultsArr[i] += Number(betObj.points)

                            i++
                        }

                        console.log('Match object: ');
                        console.log(matchObj);

                        if (match.group === id) {
                            matchesArr.push(matchObj)
                        } else {

                        }


                    }


                    let max = Math.max(...resultsArr)

                    // let max = resultsArr.math.max()
                    console.log(max);

                    for (let i = 0; i < resultsArr.length; i++) {
                        bonusArr[i] = resultsArr[i] === max ? 5 : '';
                        roundArr[i] = resultsArr[i] === max ? resultsArr[i] + 5 : resultsArr[i];
                    }


                    // console.log('resultsArr: ');
                    console.log(resultsArr);

                    // console.log('bonusArr:');
                    console.log(bonusArr);
                    console.log(roundArr);

                    for (let i = 1; i < id; i++) {
                        let obj = getGroupResults(i, users, matches, bets);
                        console.log('round ' + i);
                        console.log(obj);
                    }
                    // console.log(f);
                    res.render('home/index', {users: users, matches: matchesArr, total: {round: resultsArr, bonus: bonusArr}});
                })

            })


        })

        // res.render('game/create')
    },

    newMatchGet: (req, res) => {
        let date = new Date(Date.now())
        let dt = {
            day: date.getDate(),
            month: date.getMonth() + 1,
            hour: date.getHours(),
            minute: date.getMinutes()
        }
        res.render('game/create', {dt: dt})
    },

    newMatchPost: (req, res) => {
        let args = req.body;
        let matchArgs = {
            team1: args.team1,
            team2: args.team2,
            date: new Date(2018, Number(args.month) - 1, args.day, args.hour, args.minutes, 0, 0),
            group: args.group
        }

        if(!req.isAuthenticated() || !req.user.admin) {
            res.render('game/create', {error: 'Трябва да сте администратор за да добавяте мачове!'});
            return
        }

        // if(errorMsg) {
        //     res.render('article/create', {error: errorMsg});
        //     return;
        // }

        // console.log(req.user.id);

        Match.create(matchArgs).then(match => {
            res.redirect('/rounds/' + args.group);
        })
    },

    matchEditGet: (req, res) => {
        let backURL = req.header('Referer')
        let id = req.params.id
        Match.findById(id).then(match => {
            // console.log(bet);
            let date = match.date
            let dt = {
                day: date.getDate(),
                month: date.getMonth() + 1,
                hour: date.getHours(),
                minute: date.getMinutes()
            }
            res.render('game/matchedit', {match: match, href: backURL, dt: dt})
        })

        // res.render('game/create', {dt: dt})
    },

    matchEditPost: (req, res) => {
        let id = req.params.id
        let args = req.body;
        // console.log(args);
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(match);

            let errorMsg = '';
            if(!req.isAuthenticated() || !req.user.admin) {
                errorMsg = 'Трябва да сте администратор за да променяте мач!';
            }

            if(errorMsg) {
                res.render('game/matchedit', {error: errorMsg});
                return;
            }

            match.team1 = args.team1
            match.team2 = args.team2
            match.date = new Date(2018, Number(args.month) - 1, args.day, args.hour, args.minutes, 0, 0)

            // let matchArgs = {
            //     team1: args.team1,
            //     team2: args.team2,
            //     date: new Date(2018, Number(args.month) - 1, args.day, args.hour, args.minutes, 0, 0),
            //     group: args.group
            // }

            // match.goal1 = Number(args.goal1)
            // match.goal2 = Number(args.goal2)
            match.save(err => {
                if (err) {
                    res.render('game/matchedit', {error: err.message});
                } else {
                    res.redirect('/rounds/' + match.group);
                }
            });
        })
    },

    betGet: (req, res) => {
        let backURL = req.header('Referer')
        let id = req.params.id
        // console.log(id);
        Bet.findById(id).populate('match').then(bet => {
            // console.log(bet);
            res.render('game/bet', {bet: bet, href: backURL})
        })
    },

    betPost: (req, res) => {
        let id = req.params.id
        let betArgs = req.body;
        // console.log(betArgs);
        // console.log(id);
        Bet.findById(id).populate('author').populate('match').then(bet => {
            // console.log(bet);

            let errorMsg = '';
            if(!req.isAuthenticated()) {
                errorMsg = 'Трябва да сте влезнали в профила си!';
            } else if(req.user.userName !== bet.author.userName) {
                errorMsg = 'Не сте автор на прогнозата!';
            } else if(bet.match.date < new Date(Date.now())) {
                errorMsg = 'Времето за прогноза е изтекло!';
            }

            if(errorMsg) {
                res.render('game/bet', {error: errorMsg});
                return;
            }

            bet.goal1 = Number(betArgs.goal1)
            bet.goal2 = Number(betArgs.goal2)
            bet.save(err => {
                if (err) {
                    res.render('game/bet', {error: err.message});
                } else {
                    res.redirect('/rounds/' + bet.group);
                }
            });
        })
    },

    newbetGet: (req, res) => {
        let backURL = req.header('Referer')
        // console.log(backURL);
        let id = req.params.id
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(bet);
            res.render('game/newbet', {match: match, href: backURL})
        })
    },

    newbetPost: (req, res) => {
        let id = req.params.id
        let args = req.body;
        // console.log(args);
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(match);

            // if(!req.isAuthenticated()) {
            //     res.render('game/bet', {error: 'Трябва да сте влезнали в профила си!'});
            //     return;
            // }

            let errorMsg = '';
            if(!req.isAuthenticated()) {
                errorMsg = 'Трябва да сте влезнали в профила си!';
            } else if(match.date < new Date(Date.now())) {
                errorMsg = 'Времето за прогноза е изтекло!';
            }

            if(errorMsg) {
                res.render('game/newbet', {error: errorMsg});
                // res.redirect('/', {error: errorMsg});
                return;
            }

            let betArgs = {goal1: args.goal1, goal2: args.goal2, match: match.id, author: req.user.id, group: match.group}
            Bet.create(betArgs).then(bet => {
                match.bets.push(bet.id);
                match.save(err => {
                    if (err) {
                        res.render('game/newbet', {error: err.message});
                    } else {
                        req.user.bets.push(bet.id);
                        req.user.save(err => {
                            if (err) {
                                res.render('game/newbet', {error: err.message});
                            } else {
                                res.redirect('/rounds/' + bet.group);
                            }
                        });
                    }
                });
            })
        })
    },

    matchResultGet: (req, res) => {
        let backURL = req.header('Referer')
        let id = req.params.id
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(bet);
            res.render('game/matchresult', {match: match, href: backURL})
        })
    },

    matchResultPost: (req, res) => {
        let id = req.params.id
        let args = req.body;
        // console.log(args);
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(match);

            let errorMsg = '';
            if(!req.isAuthenticated() || !req.user.admin) {
                errorMsg = 'Трябва да сте администратор за да променяте резултат!';
            }

            if(errorMsg) {
                res.render('game/matchresult', {error: errorMsg});
                return;
            }

            match.goal1 = Number(args.goal1)
            match.goal2 = Number(args.goal2)
            match.save(err => {
                if (err) {
                    res.render('game/matchresult', {error: err.message});
                } else {
                    res.redirect('/rounds/' + match.group);
                }
            });
        })
    },

    matchDeleteGet: (req, res) => {
        let id = req.params.id
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(bet);

            let errorMsg = '';
            if(!req.isAuthenticated() || !req.user.admin) {
                errorMsg = 'Трябва да сте администратор за да изтривате мач!';
            }

            if(errorMsg) {
                res.render('game/matchedit', {error: errorMsg});
                return;
            }

            var str = "{_id :"+"ObjectId(" + "\"" + req.body + "\"" + ")" + "}";
            console.log(str);
            match.remove(err => {
                if (err) {
                    res.render('game/matchedit', {error: err.message});
                } else {
                    res.redirect('/rounds/' + match.group);
                }
            });

            // res.redirect('/rounds/' + match.group);
            // res.render('game/matchresult', {match: match, href: backURL})
        })
    },

}