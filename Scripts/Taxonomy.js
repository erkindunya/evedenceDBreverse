// Code to fetch TermSet and terms from the Manage-meta data Service
function onTaxonomySession() {    
    groups = termStore.get_groups();
    context.load(groups);
    context.executeQueryAsync(onGroupsLoaded, onTaxonomyFailed);
}

function onGroupsLoaded() {
    // iterate termStores 
    var groupEnumerator = groups.getEnumerator();

    while (groupEnumerator.moveNext()) {
        var currentGroup = groupEnumerator.get_current();
        //Hard coded the string : To get all the terms under taxonomyGroupName="Construction" 
        if (currentGroup.get_name() == taxonomyGroupName)
            getTermSets(currentGroup);
    }
}

//To Display alert message on error.
function onTaxonomyFailed(sender, args) {
    //alert('Taxonomy Error:' + args.get_message());
	window.location.href=window.location.href;
}

function getTermSets(currentGroup) {
    termSets = currentGroup.get_termSets();
    context.load(termSets);
    context.executeQueryAsync(onTermSetsLoaded, onTaxonomyFailed);
}

function onTermSetsLoaded() {
    termSetEnumerator = termSets.getEnumerator();
    //to load the master data on page load
    loadMasterData();
}
