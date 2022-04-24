let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Get Events API', () => {

    describe("GET /v1/events", () => {
        it("It should GET all the events", (done) => {
            chai.request(server)
                .get("/v1/events")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('count');
                    response.body.should.have.property('rows');
                    done();
                });
        });

        it("GET events should return 400 when page number is negative", (done) => {
            chai.request(server)
                .get("/v1/events?page=-1")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("page number should be a valid positive integer");
                    done();
                });
        });

        it("GET events should return 400 when page size is negative", (done) => {
            chai.request(server)
                .get("/v1/events?size=-1")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("page size should be a valid positive integer");
                    done();
                });
        });

        it("GET events should return 400 when page number is zero", (done) => {
            chai.request(server)
                .get("/v1/events?page=0")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("page number should be a valid positive integer");
                    done();
                });
        });

        it("GET events should return 400 when page size is zero", (done) => {
            chai.request(server)
                .get("/v1/events?size=0")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("page size should be a valid positive integer");
                    done();
                });
        });

        it("GET events should return 400 when page number is text", (done) => {
            chai.request(server)
                .get("/v1/events?page=text")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("page number should be a valid positive integer");
                    done();
                });
        });

        it("GET events should return 400 when page size is text", (done) => {
            chai.request(server)
                .get("/v1/events?size=text")
                .end((err, response) => {
                    response.should.have.status(400);
                    response.body.should.have.property('message').eq("page size should be a valid positive integer");
                    done();
                });
        });

        it("GET events should return 200 with html content when unknown path is encountered", (done) => {
            chai.request(server)
                .get("/v1/events/dummy")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.should.have.property('type').eq("text/html");
                    done();
                });
        });
    });
});