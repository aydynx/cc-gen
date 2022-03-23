# cc-gen

## setup
`npm i -g cc-generator`

## usage
### generating cards
`cc-generator -g`  
will generate one card with a random bin

`cc-generator -g 123456`  
generates card with the bin 123456

`cc-generator -n 10`  
generates 10 cards with random bins

`cc-generator -g 123456 -n 10 > cards.txt`
generates 10 cards with the bin 123456 and saves them to cards.txt