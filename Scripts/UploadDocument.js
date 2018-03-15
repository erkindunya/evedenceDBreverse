jQuery(document).ready(function () {

    // Check for FileReader API (HTML5) support.
    if (!window.FileReader) {
        alert('This browser does not support the FileReader API.');
    }
	// $('#btnUpload').on('click',function(){
		// uploadFile();	
	// });
});

// Upload the file.
// You can upload files up to 2 GB with the REST API.
function uploadFile(fileInput,subFloderTitle) {

	if(typeof(fileInput[0].files[0])!='undefined')
	{
		
		// Define the folder path for this example.
		var serverRelativeUrlToFolder = '/Testimonial documents/'+createdListItemID;

		// Get test values from the file input and text input page controls.
	   // var fileInput = jQuery('#getFile');
		var newName = $("#txtTitle").val();//jQuery('#displayName').val();

		// Get the server URL.
		var serverUrl = _spPageContextInfo.webAbsoluteUrl;
		createFloder().done(function(){
			createSubFloder(subFloderTitle).done(function(){
				// Initiate method calls using jQuery promises.
				// Get the local file as an array buffer.
				var getFile = getFileBuffer();
				getFile.done(function (arrayBuffer) {

					// Add the file to the SharePoint folder.
					var addFile = addFileToFolder(arrayBuffer,subFloderTitle);
					addFile.done(function (file, status, xhr) {

						// Get the list item that corresponds to the uploaded file.
						var getItem = getListItem(file.d.ListItemAllFields.__deferred.uri);
						getItem.done(function (listItem, status, xhr) {

							// Change the display name and title of the list item.
							var changeItem = updateListItem(listItem.d.__metadata);
							changeItem.done(function (data, status, xhr) {
							debugger;
								var FileSucessCount=$('#FileSucessCount').val();
								var selectedFiles =$('#SelectedFileCount').val();
								if(FileSucessCount==selectedFiles)
								{
									if(typeof(waitDialog)!='undefined')
										{
											waitDialog.close();
											waitDialog = null;						
										}
										
										 successMessage = "Successfully submitted the 'Project Datasheet' and your Reference ID : " + createdListItemID + ".<br /> " + "Click on 'OK' to Add Project Evidence Bite.";
										 confirm(successMessage);
								 }
							   // alert('file uploaded and updated');
							   
									// successMessage = "Successfully submitted the 'Project Datasheet' and your Reference ID : " + createdListItemID + ".<br /> " + "Click on 'OK' to Add Project Evidence Bite.";
									// confirm(successMessage);
								
							});
							changeItem.fail(onError);
						});
						getItem.fail(onError);
					});
					addFile.fail(onError);
				});
				getFile.fail(onError);
			});
		});

		// Get the local file as an array buffer.
		function getFileBuffer() {
			var deferred = jQuery.Deferred();
			var reader = new FileReader();
			reader.onloadend = function (e) {
				deferred.resolve(e.target.result);
			}
			reader.onerror = function (e) {
				deferred.reject(e.target.error);
			}
			reader.readAsArrayBuffer(fileInput[0].files[0]);
			return deferred.promise();
		}

		// Add the file to the file collection in the Shared Documents folder.
		function addFileToFolder(arrayBuffer,subFloderTitle) {

			// Get the file name from the file input control on the page.
			var parts = fileInput[0].value.split('\\');
			var fileName = parts[parts.length - 1];

			// Construct the endpoint.
			var fileCollectionEndpoint = String.format(
					"{0}/_api/web/getfolderbyserverrelativeurl('{1}/{3}')/files" +
					"/add(overwrite=true, url='{2}')",
					serverUrl, serverRelativeUrlToFolder, fileName,subFloderTitle);

			// Send the request and return the response.
			// This call returns the SharePoint file.
			return jQuery.ajax({
				url: fileCollectionEndpoint,
				type: "POST",
				async:false,
				data: arrayBuffer,
				processData: false,
				headers: {
					"accept": "application/json;odata=verbose",
					"X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
				}
			});
		}

		// Get the list item that corresponds to the file by calling the file's ListItemAllFields property.
		function getListItem(fileListItemUri) {

			// Send the request and return the response.
			return jQuery.ajax({
				url: fileListItemUri,
				type: "GET",
				async:false,
				headers: { "accept": "application/json;odata=verbose" }
			});
		}

		// Change the display name and title of the list item.
		function updateListItem(itemMetadata) {

			// Define the list item changes. Use the FileLeafRef property to change the display name. 
			// For simplicity, also use the name as the title. 
			// The example gets the list item type from the item's metadata, but you can also get it from the
			// ListItemEntityTypeFullName property of the list.
			var body = String.format("{{'__metadata':{{'type':'{0}'}},'ProjectDatasheetIDId':'{1}','Title':'{2}'}}",
				itemMetadata.type, createdListItemID, newName);

			// Send the request and return the promise.
			// This call does not return response content from the server.
			return jQuery.ajax({
				url: itemMetadata.uri,
				type: "POST",
				data: body,
				async:false,
				headers: {
					"X-RequestDigest": jQuery("#__REQUESTDIGEST").val(),
					"content-type": "application/json;odata=verbose",
					
					"IF-MATCH": itemMetadata.etag,
					"X-HTTP-Method": "MERGE"
				}
			});
		}
	
	}
	
}

// Display error messages. 
function onError(error) {
    //alert(error.responseText);
}

function createFloder() {

var dfd = new $.Deferred(); 
var ctx =  new SP.ClientContext.get_current(); 
var parentFolder; 
var docSetContentTypeID = "0x0120D520";
var web = ctx.get_web(); 
var list = web.get_lists().getByTitle('Testimonial documents'); 
ctx.load(list);
parentFolder = list.get_rootFolder(); 
ctx.load(parentFolder);

var docsetContentType = web.get_contentTypes().getById(docSetContentTypeID); 
ctx.load(docsetContentType);
ctx.executeQueryAsync(function () { 
						var isCreated = SP.DocumentSet.DocumentSet.create(ctx, parentFolder, createdListItemID, docsetContentType.get_id()); 
						GetDocumentSetIDAndUpdate(createdListItemID);
							ctx.executeQueryAsync(function(){
									 dfd.resolve();
									}, function(){									
										dfd.resolve();
									}); 
					},function(){
		} );
return dfd.promise();
}
function createSubFloder(subFloderTitle) {

var dfd = new $.Deferred(); 
var ctx =  new SP.ClientContext.get_current(); 
var parentFolder; 
var docSetContentTypeID = "0x0120D520";
var web = ctx.get_web(); 
//string targetDocSetUrl = documentLibraryName + “/” + documentSetName;

//Folder folder = web.GetFolderByServerRelativeUrl(targetDocSetUrl);
var list = web.get_lists().getByTitle('Testimonial documents'); 
ctx.load(list);
parentFolder = list.get_rootFolder(); 

ctx.load(parentFolder);
var fullFolderUrl="Testimonial documents/"+createdListItemID;
var currentFolder = web.getFolderByServerRelativeUrl(web.get_serverRelativeUrl() + fullFolderUrl);
context.load(currentFolder); 
var docsetContentType = web.get_contentTypes().getById(docSetContentTypeID); 
ctx.load(docsetContentType);
ctx.executeQueryAsync(function () { 
						var isCreated = SP.DocumentSet.DocumentSet.create(ctx, currentFolder, subFloderTitle, docsetContentType.get_id()); 
						//GetDocumentSetIDAndUpdate(createdListItemID);
							ctx.executeQueryAsync(function(){
										
										var FileSucessCount=$('#FileSucessCount').val();
										if(FileSucessCount)
										{
											FileSucessCount=parseInt(FileSucessCount)+1;
										}
										else
										{
											FileSucessCount=1;
										}
										$('#FileSucessCount').val(FileSucessCount);
										dfd.resolve();
									}, function(){
										var FileSucessCount=$('#FileSucessCount').val();
										if(FileSucessCount)
										{
											FileSucessCount=parseInt(FileSucessCount)+1;
										}
										else
										{
											FileSucessCount=1;
										}
										$('#FileSucessCount').val(FileSucessCount);
										dfd.resolve();
									}); 
					},function(){
		} );
return dfd.promise();
}

function GetDocumentSetIDAndUpdate(folderName)
{
	context = new SP.ClientContext.get_current();
	web = context.get_web();
	list = web.get_lists().getByTitle("Testimonial documents");  
    query = new SP.CamlQuery();	
	query.set_viewXml("<View><Query><ViewFields><FieldRef Name='ID' /></ViewFields><Where><Eq><FieldRef Name='FileLeafRef' /><Value Type='File'>" + folderName + "</Value></Eq></Where></Query></View>");
    allItems = list.getItems(query);
    context.load(allItems);
	context.executeQueryAsync(Function.createDelegate(this, this.success), Function.createDelegate(this, this.failed));
}
function success()
{
	var ListEnumerator = this.allItems.getEnumerator();
	while(ListEnumerator.moveNext())
	{
		var currentItem = ListEnumerator.get_current();	
		currentItem.set_item('ProjectDatasheetID',createdListItemID);
currentItem.set_item('Title','Testimonial1');		
		currentItem.update();		
	}
	context.executeQueryAsync();

}
function failed(sender, args) {
	//alert("failed. Message:" + args.get_message());
}
// var fileInput = $('input[type="file"]')[0].files[0];
// var reader = new FileReader();
// reader.onload = function (result) {
    // var fileData = '';
    // var byteArray = new Uint8Array(result.target.result)
    // for (var i = 0; i < byteArray.byteLength; i++) {
        // fileData += String.fromCharCode(byteArray[i])
    // }
// };
// reader.readAsArrayBuffer(fileInput);
// console.log(fileData)