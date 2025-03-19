function doGet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSheet = ss.getSheetByName("config");
  var PageTitle = configSheet.getRange("B1").getValue();
  var PageDescription = configSheet.getRange("B2").getValue();
  var imageData =  getImageData()

  var template = HtmlService.createTemplateFromFile('Index');
  template.PageTitle = PageTitle;
  template.PageDescription = PageDescription;
  template.imageData = imageData;
  return template.evaluate();
}

function getImageData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var configSheet = ss.getSheetByName("config");
  
  var lastRow = configSheet.getLastRow();
  
  if (lastRow < 5) {
    return [];
  }
  
  var dataRange = configSheet.getRange(5, 1, lastRow - 4, 2);
  var values = dataRange.getValues();
  
  return values.filter(function(row) {
    return row[0] !== '' && row[1] !== '';
  });
}

function vote(e) {
  var data;
  try {
    if (typeof e === 'string') {
      data = JSON.parse(e);
    } else if (typeof e === 'object') {
      data = e;
      if (e.parameter && e.parameter.layout) {
        data = { layout: e.parameter.layout };
      } else if (e.layout) {
        data = { layout: e.layout };
      }
    }
    
    if (data && data.layout) {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");

      if (sheet && data.layout) {
        var column = data.layout;
        
        var columnIndex = data.layout // column.charCodeAt(0) - 'A'.charCodeAt(0) + 1; // Converte A->1, B->2, ecc.
        var columnValues = sheet.getRange(column + "1:" + column).getValues();
        var emptyRowIndex = 1; // Partiamo dalla prima riga
        
        for (var i = 0; i < columnValues.length; i++) {
          if (!columnValues[i][0] || columnValues[i][0] === "") {
            emptyRowIndex = i + 1; // i + 1 perché gli indici partono da 0
            break;
          }

          if (i === columnValues.length - 1) {
            emptyRowIndex = columnValues.length + 1;
          }
        }
        
        var now = new Date();
        var formattedDate = now.getFullYear() + "/" + 
                   (now.getMonth() + 1).toString().padStart(2, '0') + "/" + 
                   now.getDate().toString().padStart(2, '0') + " - " + 
                   now.getHours().toString().padStart(2, '0') + ":" + 
                   now.getMinutes().toString().padStart(2, '0');
        sheet.getRange(column + emptyRowIndex).setValue(formattedDate);        

        return "Success: updated column " + column + " at row " + emptyRowIndex;
      } else {
        return "Error: Invalid layout value or sheet not found";
      }
    } else {
      return "Error: Missing layout data";
    }
  } catch (error) {
    console.error("Error in vote function:", error);
    return "Error: " + error.toString();
  }
}