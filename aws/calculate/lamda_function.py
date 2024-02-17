import json
import uuid
# import AWS SDK
import boto3
from time import gmtime, strftime

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table("calculatedb")

now = strftime("%a, %d %b %Y %H:%M:%S +0000", gmtime())

def lambda_handler(event, context):
    # TODO 
    result = eval(event['input'])
    
    dbresult = table.put_item(
        Item = {
            'id': str(uuid.uuid4()),
            'input': event['input'],
            'result': str(result),
            'updatedtime': now
        })
    return {
        'statusCode': 200,
        'body': json.dumps(result)
    }
