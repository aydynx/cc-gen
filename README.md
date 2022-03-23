# cc-gen

## setup
`npm i -g cc-gen`

## usage
### generating cards
`cc-gen -g`  
will generate one card with a random bin

`cc-gen -g 123456`  
generates card with the bin 123456

`cc-gen -n 10`  
generates 10 cards with random bins

`cc-gen -g 123456 -n 10 > cards.txt`
generates 10 cards with the bin 123456 and saves them to cards.txt