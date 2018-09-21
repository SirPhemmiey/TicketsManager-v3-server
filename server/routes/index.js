import express from 'express';
import AdminController from '../controllers/adminController';
import UserController from '../controllers/userController';
import TicketController from '../controllers/ticketsController';

const Router = express.Router();

Router.get('/tickets', TicketController.allTickets);
Router.get('/allTickets', TicketController.AdminAllTickets);
Router.get('/admin/allUsers', AdminController.allUsers);
//Router.get('/users/profile', UserController.profile);
//Router.delete('/tickets/:id', TicketController.deleteTickets);
Router.post('/tickets', TicketController.submitTicket);
Router.post('/tickets/respondTicket/:ticketID', TicketController.respondTicket);
Router.get('/lol', UserController.lol);
Router.post('/users/signup', UserController.signUp);
Router.post('/users/signin', UserController.signIn);
Router.post('/admin/signup', AdminController.signUp);
Router.post('/admin/signin', AdminController.signIn);

Router.get('/', UserController.signIn);

Router.get('/users/getTicketInfo/:ticketID', TicketController.getTicketInfo);
Router.put('/users/editTicket', TicketController.editTicket);


module.exports = Router;