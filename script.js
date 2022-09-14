import fetch from 'node-fetch';
import parameters from './parameters.json' assert {type: "json"};

const getUserData = async () => {
    const { access_token } = await fetch('https://connect.bity.com/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(`${parameters.client_id}:${parameters.client_secret}`)
        },
        body: 'grant_type=client_credentials&scope=https://auth.bity.com/scopes/reporting.exchange'
    }).then((data) => data.json());

    const data = await fetch(`https://reporting.api.bity.com/exchange/v1/summary/monthly/${parameters.year}-${parameters.month}`, {
        headers: {
            'Authorization': 'Bearer ' + access_token
        },
    }).then((data) => data.json());

    console.log('Amount of orders', data.executed);
    console.log('Total input :');

    for (let i = 0; i < data.input.length; i++) {
        console.log(data.input[i].currency + ': ' + data.input[i].amount);
    }
    console.log('Total output :');

    for (let i = 0; i < data.output.length; i++) {
        console.log(data.output[i].currency + ': ' + data.output[i].amount);
    }

}

getUserData();
