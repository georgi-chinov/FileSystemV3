/**
 *
 */

mainApp.controller('mainpageController', function($window, $location, $parse, $scope, $http, FileUploader, userSrv, fileSrv, multipartForm, $rootScope) {
    //user info + loading user information
    userSrv.userInformation().then(function(response) {
        if (response.status == 200) {
            //some logic here
        }
    }, function(response) {
        var absUrl = $location.absUrl();
        var absUrlSplitted = absUrl.split('/');
        console.log(absUrlSplitted);
        absUrlSplitted = absUrlSplitted.splice(0, absUrlSplitted.length - 1).join('/').toString();
        $window.location.href = absUrlSplitted;

        console.log(absUrlSplitted);
    })
    $scope.uploader = new FileUploader();
    $scope.visible = false;
    $scope.visibleFileForm = false;
    $scope.folder = {
        name: ''
    };
    $scope.customer = {};
    $rootScope.hide = true;
    $rootScope.showCarousel = false;

    $scope.Submit = function() {
        var uploadUrl = 'http://localhost:3000/main';
        multipartForm.post(uploadUrl, $scope.customer);
    }
    console.log($scope.item);

    $scope.logout = function() {
            userSrv.userLogout().then(function(response) {
                if (response.data && response.data.logout == true) {
                    $location.path('index.html').replace();
                }

            })
        }
        //show the form
    $scope.showForm = function() {
        if ($scope.visible == false) {
            $scope.visible = true;
            $scope.visibleFileForm = false;
        } else {
            $scope.visible = false;
        }
    }

    //get folder name
    $scope.addName = function() {
        console.log($scope.folder);
        fileSrv.sendFolderName($scope.folder).then(function(response) {
            if (response.data == "Ready!") {
                console.log("probe when folder name is not taken")

            } else if (response.data == "Exists!") {
                $scope.showModal();
                console.log("probe when folder name exists");
            }
        });

    }

    //add file - form
    $scope.showFileForm = function() {
        if ($scope.visibleFileForm == false) {
            $scope.visibleFileForm = true;
            $scope.visible = false;
        } else {
            $scope.visibleFileForm = false;
        }
    }

    //close forms
    $scope.hideFileForm = function() {
        if ($scope.visibleFileForm == true) {
            $scope.visibleFileForm = false;
        }
    }


    $scope.hideForm = function() {

        if ($scope.visible == true) {

            $scope.visible = false;
        }
    }



    //tree logic

    addExpandAllCollapseAll($scope);
    $scope.treeData = null;
    $http.get("smalltree.js").success(function(data) {
        console.log(data)
        $scope.treeData = data;
    });
    $scope.drop = function(targetNode, sourceNode, sourceParentNode) {
        var children = sourceParentNode.children;
        for (var i = 0; i < children.length; i++) {
            if (children[i] == sourceNode) {
                children.splice(i, 1);
                if (!targetNode.children) {
                    targetNode.children = [];
                }
                targetNode.children.push(sourceNode);
                break;
            }
        }
    }
})


function addExpandAllCollapseAll($scope) {
    function rec(nodes, action) {
        for (var i = 0; i < nodes.length; i++) {
            action(nodes[i]);
            if (nodes[i].children) {
                rec(nodes[i].children, action);
            }
        }
    }
    $scope.collapseAll = function() {
        rec($scope.treeData, function(node) {
            node.collapsed = true;
        });
    };
    $scope.expandAll = function() {
        rec($scope.treeData, function(node) {
            node.collapsed = false;
        });
    };
}


/* ---------- functions used to build the sample trees ------------- */

function addChild(parent, label) {
    if (!parent.children) {
        parent.children = [];
    }
    var newNode = {
        label: label,
        collapsed: false
    };
    parent.children.push(newNode);
    return newNode;
}

function addChildren(parent, labels) {
    for (var i = 0; i < labels.length; i++) {
        addChild(parent, labels[i]);
    }
}

function smallTree() {
    var root = {
        label: "root"
    };
    var folderA = addChild(root, "folder A");
    var folderB = addChild(folderA, "folder B");
    var folderC = addChild(root, "folder C");
    var folderD = addChild(folderC, "folder D");
    folderD.collapsed = true;
    var folderE = addChild(folderD, "folder E");
    var folderF = addChild(folderC, "folder F");
    var folderG = addChild(root, "folder G");
    var folderH = addChild(root, "folder H");
    addChildren(folderA, ["file A1", "file A2", "file A3", "file A4"]);
    addChildren(folderB, ["file B1", "file B2"]);
    addChildren(folderC, ["file C1"]);
    addChildren(folderE, ["file E1", "file E2", "file E3"]);
    addChildren(folderF, ["file F1", "file F2"]);
    addChildren(folderG, ["file G1", "file G2", "file G3", "file G4"]);
    addChildren(folderH, ["file H1", "file H2", "file H3"]);
    return [root];
}

function buildTree() {
    var maxLevel = 6;
    var size = 2;
    var root = {};
    recursiveAddChildren(maxLevel, 0, size, root, "A");
    return root.children;

    function recursiveAddChildren(maxLevel, currentLevel, size, parent, prefix) {
        for (var i = 0; i < size; i++) {
            var label = (currentLevel < maxLevel ? "Folder" : "File") +
                ' ' + prefix + i;
            var node = addChild(parent, label);
            if (currentLevel < maxLevel) {
                recursiveAddChildren(maxLevel, currentLevel + 1, size, node, prefix + i);
            }
        }
    }
}
