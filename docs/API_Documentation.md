# API Documentation

This document describes the API endpoints available in the Demo Piattaforma Investimenti project.

## Endpoints

### 1. Get Portfolios
- **URL**: `/api/portfolios`
- **Method**: `GET`
- **Description**: Retrieves a list of all investment portfolios.
- **Response**:
  - **Content-Type**: `application/json`
  - **Body**: An array of portfolio objects, each containing `id`, `name`, and `value`.

#### Example Response:
```json
[
  { "id": 1, "name": "Growth Portfolio", "value": 15000 },
  { "id": 2, "name": "Income Portfolio", "value": 10000 }
]
```

### 2. Get Transactions
- **URL**: `/api/transactions`
- **Method**: `GET`
- **Description**: Retrieves a list of all transactions associated with portfolios.
- **Response**:
  - **Content-Type**: `application/json`
  - **Body**: An array of transaction objects, each containing `id`, `portfolioId`, `date`, `type`, and `amount`.

#### Example Response:
```json
[
  { "id": 1, "portfolioId": 1, "date": "2023-10-01", "type": "buy", "amount": 5000 },
  { "id": 2, "portfolioId": 2, "date": "2023-10-02", "type": "sell", "amount": 3000 }
]
```

### 3. Get Market Data
- **URL**: `/api/marketdata`
- **Method**: `GET`
- **Description**: Retrieves current market data for various stocks.
- **Response**:
  - **Content-Type**: `application/json`
  - **Body**: An array of market data objects, each containing `id`, `name`, and `price`.

#### Example Response:
```json
[
  { "id": "AAPL", "name": "Apple Inc.", "price": 150 },
  { "id": "GOOGL", "name": "Alphabet Inc.", "price": 2800 }
]
```

## Notes
- Ensure that your client has access to the server running these endpoints for successful requests.
- The internal server must be active to fetch data.
- Handle responses and errors adequately in the client application to ensure smooth user experiences.