const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({

    name: { type: String, default: 'Title' },
    group: Object,
      // POSSIBLE GROUP FIELDS:
      // "created": 1323062910000,
      // "name": "Spanish /Portuguese/ English Conversation Exchange",
      // "id": 2905712,
      // "join_mode": "open",
      // "lat": 40.75,
      // "lon": -73.98999786376953,
      // "urlname": "SpanishPortugueseEnglishConversationExchange",
      // "who": "Conversationalists"
    link: { type: String },
    created: { type: Number, default: 1449679630000 },
    time: { type: Number },
    venue: Object,
      // POSSIBLE VENUE FIELDS:
      // "id": 10379022,
      // "name": "Citigroup Center's lower level Atrium",
      // "lat": 40.74055480957031,
      // "lon": -73.98394012451172,
      // "repinned": false,
      // "address_1": "153 East 53 Street @ Lexington Avenue",
      // "address_2": "3 Entrances: Lexington Ave, 52nd St, & 53rd St",
      // "city": "New York",
      // "country": "us",
      // "localized_country_name": "USA",
      // "zip": "10022",
      // "state": "NY"
    yes_rsvp_count: { type: Number, default: 0 },
    waitlist_count: { type: Number, default: 0 },
    fee: Object
    // POSSIBLE FEE FIELDS
    // "accepts": "cash",
    // "amount": 1,
    // "currency": "USD",
    // "description": "per person",
    // "label": "Price",
    // "required": false
});

mongoose.model('Event', EventSchema);
