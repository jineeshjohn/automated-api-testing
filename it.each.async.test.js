const axios = require('axios');

const add = (a, b) => a + b;
describe('test add method', () => {
    it.each`
      a     | b     | result
      ${2}  | ${3}  | ${5}
      ${20} | ${30} | ${50}
      ${-2} | ${-3} | ${-5}
    `('should return $result when $a and $b are used', ({ a, b, result }) => {
            expect(add(a, b)).toEqual(result);
        });

    const cases = [
        [1, 1, 2], 
        [1, 2, 3], 
        [2, 1, 3]
    ];
    it.each(cases)('adding %d to %d returns %d', (a, b, expected) => {
        expect(a + b).toBe(expected);
    });

    const jj = [
        ['690010037','6900000480','LTB','2018-10-03','Contents Only','2019-09-24','HX3 0TD'],
        ['690010036','6900000479','BOS','2018-10-03','Buildings Only','2019-09-17','HX1 4TW'],
        ['690010033','6900000476','LTB','2018-10-10','Buildings and Contents','2019-09-11','ME10 3JX'],
        ['690010012','6900000445','BOS','2018-12-01','Buildings and Contents','2019-08-03','ME10 3JX']
    ]

    const domain = 'http://localhost:2020/insurancepolicies';
    let policyType = 'HAP';
    let DC_SYSTEMID = '311';

    it.each(jj)('Response Status should be 200 for policyId %d',   async(policyID,customerID,brand,effectiveDate,coverType,renewalDate,postCode) => {
        const url = `${domain}?policyNumbers=${policyID}:${policyType}:${DC_SYSTEMID}&customerNumbers=${customerID}:${DC_SYSTEMID}&affinityId=${brand}&effectiveDate=${effectiveDate}`;
        const res = await axios.get(url);
        expect(res.status).toBe(200);
    });

});