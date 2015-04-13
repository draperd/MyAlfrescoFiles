# My Alfresco Files Client
Aikau client for displaying a document library containing the current users files for the purpose of testing out the Aikau Document Library with the purpose of gaining feedback on improvements and customization/extension points.

Clone the GitHub Repository and then run:

```
mvn clean install jetty:run
```

...to start up the client. Which can be accessed at the URL: [http://localhost:8090/aikau-sample](http://localhost:8090/aikau-sample)

You need to have an Alfresco Repository running on the same server (although you can configure the client to access another repository by editing the [surf.xml file](https://github.com/draperd/MyAlfrescoFiles/blob/master/src/main/webapp/WEB-INF/surf.xml)).


**Please note: This client is not an Alfresco product and is not supported in any way by Alfresco.**
