from rest_framework import viewsets, permissions, filters, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, list_route

from knox.auth import TokenAuthentication
import django_filters.rest_framework
from django.utils import timezone
from django.core.exceptions import FieldError


from introduce.serializers import (SchoolSerializer, ProfessionSerializer, CollegeSerializer, TeacherSerializer)
from .models import School, Teacher, College, Profession
from accounts.models import User
# from admissions.models import CourseAdmission


class DefaultsMixin(viewsets.ModelViewSet):

    """
    Default settings for view auth, permissions,
    filtering and pagination
    """

    # authentication_classes = (
    #     TokenAuthentication,
    # )
    # permission_classes = (
    #     permissions.IsAuthenticated,
    #     # CustomPermission
    # )
    paginate_by = 25
    filter_backends = (
        django_filters.rest_framework.DjangoFilterBackend,
        filters.SearchFilter,
        filters.OrderingFilter,
    )

    def get_queryset(self):
        self.queryset = self.queryset.filter(title=self.request.title, is_deleted=False)
        return super(DefaultsMixin, self).get_queryset()


    @api_view(['POST'])
    # @authentication_classes((TokenAuthentication,))
    # @permission_classes((permissions.IsAuthenticated,))
    def edit(request):
        mail = School.objects.create(title=request.data.get('title'), body=request.data.get('body'),
                                     created_by=request.user,)
        try:
            received_by = User.objects.get(email=request.data.get('received_email'))
        except User.DoesNotExist:
            return Response('The Receiver Does Not Exist', status=status.HTTP_400_BAD_REQUEST)
        MailReceiver.objects.create(mail=mail, status=Mail.RECEIVED, received_by=received_by)
        attachment_items = []
        for attachment in request.data.get('attachments', []):
            attachment_items.append(MailAttachment(mail=mail, name=attachment.get('name'), url=attachment.get('url')))
        if attachment_items:
            MailAttachment.objects.bulk_create(attachment_items)
        return Response(status=status.HTTP_200_OK)