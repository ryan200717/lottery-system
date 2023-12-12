# API Specification

1. GET /available

#### Introduction
This endpoint is for getting the available status of lottery systems

#### Method
GET

#### Endpoint
`/available`

#### Request Headers
nil

#### Request Query Parameters
nil

#### Request Body Parameters
nil

#### Response Body Parameters

| Name           | Type    | Description                                       | <div style="width:220px">Example</div> |
|----------------|---------|---------------------------------------------------|----------------------------------------|
| success        | Boolean | Indication that the request is successful or not. | `true`                                 |
| status         | String  | The http response status code.                    | `200                                   |
| data           | Object  | An object of the bms data                         | see Below                              |
| data.available | boolean | An status of the lottery status                   | `true`                                 |
| data.message   | string  | An reason that the system is not ready            | `No relevant ticket found`             |



#### Response Examples
```json
{
   "success": true,
   "response_code": "200",
   "data":{
     "available": false,
     "message":"No relevant ticket found"
   }
  
}
```

2. GET /result

#### Introduction
This endpoint is for checking the user ticket

#### Method
GET

#### Endpoint
`/result`

#### Request Headers
nil

#### Request Query Parameters
| Name      | Type   | Required | Description                         | <div style="width:220px">Example</div> |
|-----------|--------|----------|-------------------------------------|----------------------------------------|
| user_name | string | Yes      | Indication of the ticket owner name | `test_user1`                           |
| ticket_id | string | Yes      | Indication of the ticket id         | `5280e0b8-de17-4d4b-b7b9-aa17ed5ff87e` |


#### Request Body Parameters
nil

#### Response Body Parameters

| Name          | Type    | Description                                       | <div style="width:220px">Example</div> |
|---------------|---------|---------------------------------------------------|----------------------------------------|
| success       | Boolean | Indication that the request is successful or not. | `true`                                 |
| status        | String  | The http response status code.                    | `200                                   |
| data          | Object  | An object of the bms data                         | see Below                              |
| data.result   | boolean | An status of the ticket result                    | see Below                              |
| data.round    | string  | the round of the ticket belongs to                | see Below                              |
| data.name     | string  | the ticket owner`s name                           | see Below                              |
| data.ticketId | string  | the ticket Id                                     | see Below                              |



#### Response Examples
```json
{
   "success": true,
   "response_code": "200",
   "data":{
     "result":"LOSE",
     "round":3,
     "owner_name":"1234",
     "ticket_id":"5280e0b8-de17-4d4b-b7b9-aa17ed5ff87e"
   }
  
}
```

3. POST /result

#### Introduction
This endpoint is for user to buy a lottery ticket

#### Method
POST

#### Endpoint
`/`

#### Request Headers
nil

#### Request Query Parameters
nil

#### Request Body Parameters
| Name      | Required | Description  | Example     |
|-----------|----------|--------------|-------------|
| user_name | Yes      | ticket owner | `test_user` |


#### Response Body Parameters

| Name            | Type    | Description                                       | <div style="width:220px">Example</div> |
|-----------------|---------|---------------------------------------------------|----------------------------------------|
| success         | Boolean | Indication that the request is successful or not. | `true`                                 |
| status          | String  | The http response status code.                    | `200                                   |
| data            | Object  | An object of the bms data                         | see Below                              |
| data.ticket_id  | string  | ticket id                                         | see Below                              |
| data.round      | string  | which round the ticket belongs to                 | see Below                              |
| data.owner_name | string  | ticket`s owner name                               | see Below                              |
| data.createTime | string  | the time that create ticket                       | see Below                              |



#### Response Examples
```json
{
   "success": true,
   "response_code": "200",
   "data":{
     "ticket_id": "49a4abad-b44c-46c1-b99c-ea7948247958",
     "owner_name": "tester1",
     "round": 13,
     "createTime": "2023-12-12 11:24:19"
   }
  
}
```



## Error Codes And Descriptions

| Error code | Description                                           | Remarks |
|------------|-------------------------------------------------------|---------|
| 0000       | Caught error.                                         |         |
| 0001       | Please Enter a valid user name.                       |         |
| 0002       | Please Enter a valid ticket Id                        |         |
| 0003       | Lottery system is Locked! Please join the Next Round! |         |
| 0004       | No relevant ticket found                              |         |

