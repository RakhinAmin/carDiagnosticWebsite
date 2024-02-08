# views.py
from rest_framework.decorators import api_view
from rest_framework.response import Response


@api_view(['POST'])
def handle_brake_response(request):
    # Extract user response from the request data
    user_response = request.data.get('response', None)

    # Print the user response for debugging
    print(f"Received user response: {user_response}")

    # Process the response (you can save it to the database or perform any required logic)
    if user_response == 'Yes':
        # Handle 'Yes' response
        # Your logic here
        return Response({'message': 'Brake response recorded: Yes'})
    elif user_response == 'No':
        # Handle 'No' response
        # Your logic here
        return Response({'message': 'Brake response recorded: No'})
    else:
        return Response({'message': 'Invalid response'})
