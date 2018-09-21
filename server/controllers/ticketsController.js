import Ticket from '../models/ticketModel';
import User from '../models/userModel';
import Response from '../models/responseModel';
import jwt from 'jsonwebtoken';


exports.allTickets = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    //if the header is provided
    if (authorizationToken) {
        try {
            const token = jwt.verify(authorizationToken, 'Algorithm...221');
            let tickets = await Ticket.find({user: token._id}).populate('response');
            //if tickets is found
            if (tickets) {
                //ok
                res.status(200).json({
                    success: true,
                    tickets: tickets
                });
            }
            else {
                //internal server error
                res.status(500).json({
                    success: false,
                    message: "An error occured"
                });
            }
        }
        catch(err) {
            res.status(401).json({
                success: false,
                message: 'Unauthorized Access'
            });
        }

    }
    //auth header not provided
    else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

}


exports.AdminAllTickets = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    //if the header is provided
    if (authorizationToken) {
        try {
            const token = jwt.verify(authorizationToken, 'Algorithm...221');
            let tickets = await Ticket.find({status : 'open'}).populate('user', 'firstName');
            //if tickets is found
            if (tickets) {
                //ok
                res.status(200).json({
                    success: true,
                    tickets: tickets
                });
            }
            // else if (!tickets.length) {
            //     res.json({
            //         success: false,
            //         message: 'Empty'
            //     });
            // }
            else {
                //internal server error
                res.status(500).json({
                    success: false,
                    message: "An error occured"
                });
            }
        }
        catch(err) {
            console.log(err.message);
            res.status(401).json({
                success: false,
                message: 'Unauthorized Access'
            });
        }

    }
    //auth header not provided
    else {
        res.status(401).json({
            success: false,
            message: 'Unauthorized Access'
        });
    }

}

exports.respondTicket = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    if (authorizationToken) {
        try {
            const token = jwt.verify(authorizationToken, 'Algorithm...221');
            if (token) {
                const ticketID = req.params.ticketID;
                let doc = {
                    ticket: ticketID,
                    response: req.body.response
                }

                const responseQuery = await Response.create(doc);
                if (responseQuery) {
                    let query = {
                        status: 'closed',
                        response: responseQuery._id
                    };
                    const updateTicket = await Ticket.findOneAndUpdate({_id: ticketID}, query)
                    if (updateTicket) {
                        res.status(200).json({
                            success: true,
                            message: "Success"
                        });
                    }
                    else {
                        res.json({
                            success: false,
                            message: "Could not update ticket"
                        });
                    }
                }
                else {
                    res.json({
                        success: false,
                        message: "Could not create response"
                    });
                }
            }
            else {
                res.status(401).json({
                    success: false,
                    message: 'Invalid token'
                });
            }
        } catch(err) {
            res.status(500).json({
                success: false,
                message: 'Could not validate token'
            });
        }
    }
    else {
        res.status(401).json({
            success: false,
            message: "Unauthorized Access"
        });
    }
}

exports.editTicket = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    try {
        const token = jwt.verify(authorizationToken, 'Algorithm...221');
        if (token) {
            const query = {
                subject: req.body.subject,
                complain: req.body.complain
            };
            const options = {
                new: true
            }
            const editedTicket = await Ticket.findOneAndUpdate({_id: req.body.p}, query, options)
            if (editedTicket) {
                res.status(200).json({
                    success: true,
                    data: editedTicket
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'An error occured'
                });
            }
        }
    }
    catch(err) {
        res.status(402).json({
            success: false,
            message: err.message
        });
    }
}

exports.getTicketInfo = async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    try {
        const token = jwt.verify(authorizationToken, 'Algorithm...221');
        if (token) {
            const ticket = await Ticket.findById(req.params.ticketID);
            if (ticket) {
                res.status(200).json({
                    success: true,
                    data: ticket
                });
            }
            else {
                res.status(500).json({
                    success: false,
                    message: 'Could not find ticket'
                });
            }
        }
    }
    catch(err) {
        res.status(401).json({
            success: false,
            message: 'Provide a token'
        });
    }
}

exports.submitTicket =  async (req, res) => {
    const authorizationToken = req.headers['authorization'].split(" ")[1];
    try {
        const token = jwt.verify(authorizationToken, 'Algorithm...221');
        if (token) {
            req.body.user = token._id;
             if (!req.body) {
             res.json({
                 message: 'Please fill all the fields',
                 success: false
             });
         }
       try {
           req.body.status = 'open';
         const ticket = await Ticket.create(req.body);
         if (ticket) {
             req.body = undefined;
            //const user = await User.findByIdAndUpdate(token._id, {ticket: ticket._id});
          //   if (user) {
                res.status(200).json({
                    message: 'Ticket submitted successfully',
                    success: true
                });
             //}
         } else {
             //bad request
             res.status(400).json({
                 success: false,
                 message: 'Could not create ticket'
             });
         }
       }
       catch(err) {
           //internal server error
           res.status(500).json({
               success: false,
               message: err.message
           });
       }
     }
     else {
         //unathorized access
         res.status(401).json({
             success: false,
             message: 'Unathorized access'
         });
     }
    }
    catch(err) {
        console.log(err.message);
    }
 }

// exports.deleteTickets = (req, res) => {
//     for (let i = 1; i <= Ticket.length; i++) {
//         if (Ticket[i].id === parseInt(req.params.ticketId, 10)) {
//             Ticket.splice(i, 1);
//             return res.status(200).json({
//                 message: 'Ticket deleted successfully',
//                 error: false
//             });
//         }
//     }
// }