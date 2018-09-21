import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';
const { expect } = chai;
chai.use(chaiHttp);

//admin token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjk3ZDAwNTcwM2Q0NDcwMGNkOGI2NWYiLCJmaXJzdE5hbWUiOiJhZG1pbiIsImlhdCI6MTUzNjY4NzM3N30.7g_WjYsjcTZGS_02mmqEg23kLUgugPITaLs5ql4v9cQ


//user token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhjOWNkYWEwYThlMTEwNGM1MGJiNjIiLCJmaXJzdE5hbWUiOiJBa2luZGUiLCJsYXN0TmFtZSI6Ik9sdXdhZmVtaSIsImVtYWlsIjoib2x1d2FmZW1pYWtpbmRlQGdtYWlsLmNvbSIsImlhdCI6MTUzNjgzODM4MH0.WxMVWAmEJ3MND51R1asGdYAIpQAKbQcsFZjgoCTIMec

//token is
describe('Tickets Manager API test', () => {

    describe('GET /allTickets', () => {
        it('should return all tickets', function (done) {
            this.timeout(15000)
            chai
            .request(app)
            .get('/allTickets')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Yjk3ZDAwNTcwM2Q0NDcwMGNkOGI2NWYiLCJmaXJzdE5hbWUiOiJhZG1pbiIsImlhdCI6MTUzNjY4NzM3N30.7g_WjYsjcTZGS_02mmqEg23kLUgugPITaLs5ql4v9cQ')
            .end((err, res) => {
                expect(Array.isArray(res.body.tickets)).to.be.equal(true);
                done();
            })
        });
    })

    describe('GET /users/ticketsInfo/:ticketID', () => {
        it('should return a particular ticket information', function(done) {
            this.timeout(15000)
            chai
            .request(app)
            .get('/users/getTicketInfo/5b9a4ab6c1f4686fe08d31f6')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhjOWNkYWEwYThlMTEwNGM1MGJiNjIiLCJmaXJzdE5hbWUiOiJBa2luZGUiLCJsYXN0TmFtZSI6Ik9sdXdhZmVtaSIsImVtYWlsIjoib2x1d2FmZW1pYWtpbmRlQGdtYWlsLmNvbSIsImlhdCI6MTUzNjgzODM4MH0.WxMVWAmEJ3MND51R1asGdYAIpQAKbQcsFZjgoCTIMec')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            })
        });
    });

    // describe('POST /tickets', () => {
    //     it('should add a new ticket', function(done) {
    //         chai
    //         .request(app)
    //         .post('/tickets')
    //         .send(
    //             {subject: 'The test subject',
    //              complain: 'The test complain',
    //              status: 'open'
    //             })
    //         .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhjOWNkYWEwYThlMTEwNGM1MGJiNjIiLCJmaXJzdE5hbWUiOiJBa2luZGUiLCJsYXN0TmFtZSI6Ik9sdXdhZmVtaSIsImVtYWlsIjoib2x1d2FmZW1pYWtpbmRlQGdtYWlsLmNvbSIsImlhdCI6MTUzNjgzODM4MH0.WxMVWAmEJ3MND51R1asGdYAIpQAKbQcsFZjgoCTIMec')
    //         .end((err, res) => {
    //             expect(res).to.have.status(200);
    //             done();
    //         })
    //     });
    // })

    describe('POST /tickets/respondTicket/:ticketID', () => {
        it('should give response to a ticket', function(done) {
            chai
            .request(app)
            .post('/tickets/respondTicket/5b9a4ab6c1f4686fe08d31f6')
            .send(
                {response: 'I have responded',
                 ticket: '5b9a4ab6c1f4686fe08d31f6'
                })
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhjOWNkYWEwYThlMTEwNGM1MGJiNjIiLCJmaXJzdE5hbWUiOiJBa2luZGUiLCJsYXN0TmFtZSI6Ik9sdXdhZmVtaSIsImVtYWlsIjoib2x1d2FmZW1pYWtpbmRlQGdtYWlsLmNvbSIsImlhdCI6MTUzNjgzODM4MH0.WxMVWAmEJ3MND51R1asGdYAIpQAKbQcsFZjgoCTIMec')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done()
            })
        })
    })

    describe('PUT /users/editTicket', () => {
        it('should put subject and complain', function(done) {
            chai
            .request(app)
            .put('/users/editTicket')
            .send({
                p: '5b9a4ab6c1f4686fe08d31f6',
                subject: 'Edit Subject',
                complain: 'Edited Complain'
            })
            .set('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjhjOWNkYWEwYThlMTEwNGM1MGJiNjIiLCJmaXJzdE5hbWUiOiJBa2luZGUiLCJsYXN0TmFtZSI6Ik9sdXdhZmVtaSIsImVtYWlsIjoib2x1d2FmZW1pYWtpbmRlQGdtYWlsLmNvbSIsImlhdCI6MTUzNjgzODM4MH0.WxMVWAmEJ3MND51R1asGdYAIpQAKbQcsFZjgoCTIMec')
            .end((err, res) => {
                expect(res).to.have.status(200)
                done()
            })
        })
    })
});