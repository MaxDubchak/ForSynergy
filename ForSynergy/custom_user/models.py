"""This module implements class that represents the user entities."""
from django.db import models, OperationalError


class CustomUser(models.Model):
    """Model of CustomUser entities"""
    email = models.CharField(max_length=128, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        """Method used to represent user entity as string"""
        print(f'User {self.id} with email {self.email}')

    def to_dict(self):
        """Method that returns dict with object's attributes."""
        return {
            'user_id': self.id,
            'email': self.email,
            'password': self.password,
        }

    @classmethod
    def create(cls, email, password):
        """Method for creation of user entity."""
        user = cls()

        try:
            user.email=email
            user.password=password
            user.save()
            return user
        except(ValueError, OperationalError):
            return None

    def update(self, password=None):
        """Method used to update user entities"""
        try:
            if password:
                self.password = password
            self.save()
        except(ValueError, OperationalError):
            return False

        return True

    @classmethod
    def get_all_users(cls):
        """Method to retrieve all users"""
        try:
            return cls.objects.all()
        except OperationalError:
            return []

    @classmethod
    def get_by_email(cls, email):
        """Method to retrieve user found by email value"""
        try:
            return cls.objects.get(email=email)
        except OperationalError:
            return None
