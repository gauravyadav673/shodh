var mongoose = require('mongoose');
var attendedSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	eventName:{
		type:String
	},
	sponsor:{
		type:String
	},
	venue:{
		type:String
	},
	startDate:{
		type:Date 
	},
	endDate:{
		type:Date
	},
	duration:{
		type:String
	}
});

var organisedSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	eventName:{
		type:String
	},
	sponsor:{
		type:String
	},
	grant:{
		type:String
	},
	venue:{
		type:String
	},
	startDate:{
		type:Date 
	},
	endDate:{
		type:Date
	},
	duration:{
		type:String
	}
});

var patentSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	name:{
		type:String
	},
	patentNumber:{
		type:String
	},
	description:{
		type:String
	},
	dateOfPatent:{
		type:Date
	}
});


var citationSchema = mongoose.Schema({
	username:{
		type:String,
		index:true
	},
	citaionCount:{
		type:String
	},
	hIndex:{
		type:String
	},
	iTenIndex:{
		type:String
	}
});

var projectSchema = mongoose.Schema({
	username:{
		type:String
	},
	name:{
		type:String
	},
	sponsor:{
		type:String
	},
	grant:{
		type:String
	},
	description:{
		type:String
	},
	startDate:{
		type:Date
	},
	endDate:{
		type:Date
	}

});

module.exports.attended = mongoose.model('attended', attendedSchema);
module.exports.organised = mongoose.model('organised', organisedSchema);
module.exports.patent = mongoose.model('patent', patentSchema);
module.exports.citation = mongoose.model('citaion', citationSchema);
module.exports.project = mongoose.model('project', projectSchema);