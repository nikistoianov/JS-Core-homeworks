// const Article = require('mongoose').model('Article');
const Match = require('mongoose').model('Match');
const Bet = require('mongoose').model('Bet');
const User = require('mongoose').model('User');

module.exports = {
    roundGet: (req, res) => {
        let id = req.params.id
        let dt = function (num) {
            return Number(num) < 10 ? '0' + num : num
        }
        User.find({}).populate('bets').then(users => {
            // console.log(users);
            Match.find({group: id}).then(matches => {
                // console.log(matches);
                // Match.populate(matches, 'bets', function (err, matches) {
                //     console.log(matches);
                // })
                Bet.find({group: id}).populate('match').populate('author').then(bets => {
                    // console.log('Bets:');
                    // console.log(bets);
                    let f = []
                    let currentUser = req.isAuthenticated() ? req.user.userName : ''
                    // console.log('currentUser:');
                    // console.log(currentUser);
                    for (let match of matches) {
                        let ff = {
                            team1: match.team1,
                            team2: match.team2,
                            result: match.goal1 == undefined ? 'няма' : match.goal1 + ' : ' + match.goal2
                        }
                        // console.log(match.result);
                        ff.team1 = match.team1
                        ff.team2 = match.team2
                        ff.result = match.goal1 == undefined ? 'няма' : match.goal1 + ' : ' + match.goal2
                        let d = match.date
                        ff.date = dt(d.getDate())  + "." + dt(d.getMonth()+1) + " " + dt(d.getHours()) + ":" + dt(d.getMinutes())
                        ff.bets = []

                        // console.log(match.date);
                        // console.log(new Date(Date.now()));
                        // let passed = match.date > new Date(Date.now())
                        // console.log(passed);

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
                                    // ff.bets.push(betObj)
                                    foundBet = true
                                    break
                                }
                            }
                            if (!foundBet) {
                                betObj.href = 'newbet/' + match.id
                                betObj.result = 'няма'
                            }
                            ff.bets.push(betObj)
                            // let bet = bets.find(x => x.author.userName === user.userName)

                        }

                        f.push(ff)

                        // let datestring = d.getMonth() + ":" + d.getFullYear() + " " +
                        //     d.getHours() + ":" + d.getMinutes();
                        // match.date = datestring
                        // console.log(datestring);
                        // console.log(match.date);
                    }
                    // matches = matches.map(m => {
                    //     // console.log(m.date);
                    //     m.date = '1'
                    //     return m
                    // })

                    // console.log(f);
                    res.render('home/index', {users: users, matches: f});
                })

            })
        })

        // res.render('game/create')
    },

    newMatchGet: (req, res) => {
        res.render('game/create')
    },

    newMatchPost: (req, res) => {
        let args = req.body;
        let matchArgs = {
            team1: args.team1,
            team2: args.team2,
            date: new Date(2018, Number(args.month) - 1, args.day, args.hour, args.minutes, 0, 0),
            group: args.group
        }

        let errorMsg = '';
        // if(!req.isAuthenticated()) {
        //     errorMsg = 'You should be logged in to make articles!';
        // } else if(!matchArgs.title) {
        //     errorMsg = 'Invalid title!';
        // } else if(!matchArgs.content) {
        //     errorMsg = 'Invalid content!';
        // }

        // if(errorMsg) {
        //     res.render('article/create', {error: errorMsg});
        //     return;
        // }

        // console.log(req.user.id);

        Match.create(matchArgs).then(match => {
            res.redirect('/rounds/' + args.group);
        })
    },

    betGet: (req, res) => {
        let id = req.params.id
        // console.log(id);
        Bet.findById(id).populate('match').then(bet => {
            // console.log(bet);
            res.render('game/bet', {bet: bet})
        })
    },

    betPost: (req, res) => {
        let id = req.params.id
        let betArgs = req.body;
        console.log(betArgs);
        console.log(id);
        Bet.findById(id).populate('author').then(bet => {
            console.log(bet);

            let errorMsg = '';
            if(!req.isAuthenticated()) {
                errorMsg = 'Трябва да сте влезнали в профила си!';
            } else if(req.user.userName !== bet.author.userName) {
                errorMsg = 'Не сте автор на прогнозата!';
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
        let id = req.params.id
        // console.log(id);
        Match.findById(id).then(match => {
            // console.log(bet);
            res.render('game/newbet', {match: match})
        })
    },

    newbetPost: (req, res) => {
        let id = req.params.id
        let args = req.body;
        console.log(args);
        console.log(id);
        Match.findById(id).then(match => {
            console.log(match);

            let errorMsg = '';
            if(!req.isAuthenticated()) {
                errorMsg = 'Трябва да сте влезнали в профила си!';
            }

            if(errorMsg) {
                res.render('game/bet', {error: errorMsg});
                return;
            }

            let betArgs = {goal1: args.goal1, goal2: args.goal2, match: match.id, author: req.user.id, group: match.group}
            Bet.create(betArgs).then(bet => {
                match.bets.push(bet.id);
                match.save(err => {
                    if (err) {
                        res.redirect('/', {error: err.message});
                    } else {
                        req.user.bets.push(bet.id);
                        req.user.save(err => {
                            if (err) {
                                res.redirect('/', {error: err.message});
                            } else {
                                res.redirect('/');
                            }
                        });
                        // res.redirect('/');
                    }
                });
            })

            // match.goal1 = Number(args.goal1)
            // match.goal2 = Number(args.goal2)
            // bet.save(err => {
            //     if (err) {
            //         res.render('game/bet', {error: err.message});
            //     } else {
            //         res.redirect('/');
            //     }
            // });
            //
            // res.render('game/bet', {bet: bet})
        })
    },

}