from rest_framework import permissions


class IsAdminUserMixin():
    permission_classes = [permissions.IsAdminUser,]
