<?php
session_start();
$host = "ec2-18-207-95-219.compute-1.amazonaws.com";
$user = "sclhfuwzyeozhn";
$password = "710d9dc6f8def69f87965fa0b9bd77ae62e2f1be68abbcfbb7f1433c958fd224";
$dbname = "da8umdeu5jatdk";
$port = "5432";

try{
  //Set DSN data source name
    $dsn = "pgsql:host=" . $host . ";port=" . $port .";dbname=" . $dbname . ";user=" . $user . ";password=" . $password . ";";
    $connStr = "host=$host port=$port dbname=$dbname user=$user password=$password";

  //create a pdo instance
  $pdo = pg_connect($connStr);

  $pod = new PDO($dsn, $user, $password);
  $pod->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE,PDO::FETCH_OBJ);
  $pod->setAttribute(PDO::ATTR_EMULATE_PREPARES,false);
  $pod->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch (PDOException $e) {
echo 'Connection failed: ' . $e->getMessage();
}

$data = json_decode(file_get_contents('php://input'), true);

/* catch data from the form using Post and encoding password*/
$email = pg_escape_string($data['email']);
$pwd = md5(pg_escape_string($data['password']));

$search = "SELECT password from Account where email='$email';";
$squery = pg_query($pdo, $search);
$nbud = pg_fetch_row($squery);
$loginpwd = $nbud[0];

if($loginpwd!=NULL)
{
    if(!strcmp($pwd,$loginpwd))
    {
        /* link to home page */
        $search = "SELECT * from Account where email='$email';";
        $squery = pg_query($pdo, $search);
        $nbud = pg_fetch_row($squery);
        $value = json_encode($nbud);
        echo $value;
        http_response_code(200);
    }
    else
    {
     /* link to login page */
     http_response_code(400);
    }
}
else
{
 /* link to login page */
 http_response_code(400);
}
?>