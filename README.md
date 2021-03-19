## GraphQL API (Written in Node.js)

## Running Locally
- Clone this repo
- Node version >= 12.0.0 (NPM >= 6.9.0)
- `npm install`
- `npm run watch`
- (Open seperate terminal) `npm run start`
- API available at `http://localhost:3001/graphql`

## Endpoint Example Payloads
### Min
```
{
  min(numbers:[4,1,1,2], quantifier:2){
    answer
    error {
      message
    }
  }
}
```

### Max
```
{
  max(numbers:[4,1,1,2], quantifier:2){
    answer
    error {
      message
    }
  }
}
```


### Avg
```
{
  avg(numbers:[1,2,3]){
    answer
    error {
      message
    }
  }
}
```

### Median 
```
{
  median(numbers:[6,5,1,2,3,4]){
    answer
    error {
      message
    }
  }
}
```

### Percentile
```
{
  percentile(numbers:[6,5,1,2,3,4], quantifier:50){
    answer
    error {
      message
    }
  }
}
```
