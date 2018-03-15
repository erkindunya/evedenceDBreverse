function LogError(args){
			var Error_List = context.get_web().get_lists().getByTitle('ErrorLogging');
			var ErroritemCreateInfo = new SP.ListItemCreationInformation();
			var errorListItem = Error_List.addItem(ErroritemCreateInfo);
			errorListItem.set_item('Where',window.location.href);
			errorListItem.set_item('CorrealationID', args.get_errorTraceCorrelationId());
			errorListItem.set_item('Message', args.get_message());
			errorListItem.update();
			context.executeQueryAsync(Function.createDelegate(this, this.onErrorLogSucceeded), Function.createDelegate(this, this.onErrorLogFailed));
}
function onErrorLogSucceeded(){

}

function onErrorLogFailed(sender, args) {
    //alert('Error while inserting log ' + args.get_message() );
}