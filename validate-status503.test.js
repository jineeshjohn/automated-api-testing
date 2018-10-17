const axios = require('axios');
const Docker = require('dockerode');
const _ = require('lodash');


const add = (a, b) => a + b;
jest.setTimeout(30000);
describe("Initialize docker", () => {
    var docker = new Docker({ socketPath: '/var/run/docker.sock' });
    var containerWrap;

    beforeAll(async() => {
        await new Promise((resolve, reject) => {
            docker.listContainers(function (err, containers) {
                const container = _.find(containers, {Names: ['/db_db2_1'] });
                if(container){
                    containerWrap = docker.getContainer(container.Id);
                    resolve();
                };
            });
        });
    });

    const testData = ['690010037','6900000480','LTB','2018-10-03','Contents Only','2019-09-24','HX3 0TD'];
    const domain = 'http://localhost:2020/insurancepolicies';
    let policyType = 'HAP';
    let DC_SYSTEMID = '311';

    it('Response Status should be 503 when service is down',   async() => {
        await new Promise((resolve, reject) => {
            containerWrap.stop(()=>{
                resolve();
            });      
        });
        const [policyID,customerID,brand,effectiveDate,coverType,renewalDate,postCode] = testData;
        const url = `${domain}?policyNumbers=${policyID}:${policyType}:${DC_SYSTEMID}&customerNumbers=${customerID}:${DC_SYSTEMID}&affinityId=${brand}&effectiveDate=${effectiveDate}`;
        try{
            const res = await axios.get(url);
        } catch( error ){
            expect(error.response.status).toBe(503);
        }
    });

    it('Response Status should be 200 for policyId',   async() => {
        await new Promise((resolve, reject) => {
            containerWrap.start(()=>{
                resolve();
            });      
        });
        const [policyID,customerID,brand,effectiveDate,coverType,renewalDate,postCode] = testData;
        const url = `${domain}?policyNumbers=${policyID}:${policyType}:${DC_SYSTEMID}&customerNumbers=${customerID}:${DC_SYSTEMID}&affinityId=${brand}&effectiveDate=${effectiveDate}`;
        const res = await axios.get(url);
        expect(res.status).toBe(200);  
    });

});
 