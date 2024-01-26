# Import necessary modules
from django.contrib.auth import get_user_model  # Retrieve user model from Django
# Used to convert data into JSON format for the application to use
from djoser.serializers import UserCreateSerializer

# Get the user model and assign to User variable
User = get_user_model()


# Define a custom serializer for user creation, inheriting from UserCreateSerializer
class CreateUserSerializer(UserCreateSerializer):

    # Define metadata for the serializer
    class Meta(UserCreateSerializer.Meta):
        # Specify the model for the serializer
        model = User
        # Specify the fields to include in the serialized data
        fields = ['id', 'email', 'first_name', 'last_name', 'password']
